import React, {useEffect, useState} from 'react';
import {
  Link,
  useLocation
} from 'react-router-dom';
import {getToc} from './util/data.util';

export function PostList(props) {

  const [posts, setPosts] = useState(props.toc || []);
  const location = useLocation();

  useEffect(() => {
    if (!posts.length) {
      getToc()
        .then(data => setPosts(data));
    }
  }, [posts.length]);

  function getActiveClass(post) {
    return !!location.pathname.split('#')[0].split('/').find(p => post.path === p) ? 'active' : '';
  }

  return <ul className="post-list">
    {
      posts.map((post, index) =>
        <li className={getActiveClass(post)} key={index}>
          <Link to={`/posts/${post.path}`}>{post.title}</Link>
          {
            post.children && <ul>
              {
                post.children.map((child, childIndex) =>
                  <li className={getActiveClass(child)} key={childIndex}>
                  <Link to={`/posts/${child.path}`}>{child.title}</Link>
                </li>)
              }
            </ul>
          }
        </li>
      )
    }
  </ul>
};
