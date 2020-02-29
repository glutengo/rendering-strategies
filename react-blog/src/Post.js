import React, {useEffect, useState, useRef} from 'react';
import {
  useParams,
  useHistory
} from 'react-router-dom';
import {getPost} from './util/data.util';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function Post(props) {

  const [content, setContent] = useState(props.content);
  const { id } = useParams();
  const previousId = usePrevious(id);
  const history = useHistory();

  useEffect(() => {
    if (!content || (previousId && id !== previousId)) {
      getPost(id)
        .then(data => setContent(data));
    }
  }, [ id, content, previousId ]);

  function onClick(event) {
    const href = event.target.getAttribute('href');
    if (href && !(href.startsWith('http')) && !(href.startsWith('#'))) {
      history.push(href);
      event.preventDefault();
    }
  }

  return <div className="post" dangerouslySetInnerHTML={{__html: content}} onClick={event => onClick(event)}></div>;
}
