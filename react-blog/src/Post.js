import React, {useEffect, useState} from 'react';
import {
  useParams
} from 'react-router-dom';

export function Post() {

  const [content, setContent] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8082/post/${id}`)
      .then(response => response.text())
      .then(data => setContent(data));
  }, [ id ]);


  return <div className="post" dangerouslySetInnerHTML={{__html: content}}></div>;
}
