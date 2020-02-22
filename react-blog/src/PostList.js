import React, {useEffect, useState} from 'react';
import {
  Link,
  useLocation
} from 'react-router-dom';

export function PostList() {

  const [posts, setPosts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetch(`http://localhost:8082/posts/toc.json`)
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  function getActiveClass(post) {
    return !!location.pathname.split('#')[0].split('/').find(p => post.path === p) ? 'active' : '';
  }

  return <ul className="post-list">
    <li><Link to="/">Home</Link></li>
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
