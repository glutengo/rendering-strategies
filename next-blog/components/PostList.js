import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import 'isomorphic-fetch';
import {useCache, withCache} from '../util/http-cache.util';
import {getBaseURL} from '../util/env.util';

export function PostList(props) {

  const { posts } = withCache(props);
  const router = useRouter();

  function getActiveClass(post) {
    return !!router.asPath.split('#')[0].split('/').find(p => post.path === p) ? 'active' : '';
  }

  return <ul className="post-list">
    {
      posts.map((post, index) =>
        <li className={getActiveClass(post)} key={index}>
          <Link href="/posts/[id]" as={`/posts/${post.path}`}><a>{post.title}</a></Link>
          {
            post.children && <ul>
              {
                post.children.map((child, childIndex) =>
                  <li className={getActiveClass(child)} key={childIndex}>
                    <Link href="/posts/[id]" as={`/posts/${child.path}`}><a>{child.title}</a></Link>
                  </li>)
              }
            </ul>
          }
        </li>
      )
    }
  </ul>
}

PostList.getInitialProps = async function(context) {
  return { posts: await useCache(`${getBaseURL(context)}/posts/toc.json`, 'posts') };
};

