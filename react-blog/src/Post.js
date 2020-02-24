import React, {useEffect, useState, useRef} from 'react';
import {
  useParams
} from 'react-router-dom';
import {getPost} from './util/data.util';

export function Post(props) {

  const [content, setContent] = useState(props.content);
  const { id } = useParams();

  useEffect(() => {
      getPost(id)
        .then(data => setContent(data));
  }, [ id ]);


  return <div className="post" dangerouslySetInnerHTML={{__html: content}}></div>;
}
