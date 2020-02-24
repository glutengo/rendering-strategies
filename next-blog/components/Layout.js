import React from 'react';
import {Header} from './Header';
import Head from 'next/head';
import 'isomorphic-fetch';
import {PostList} from './PostList';

function onClickMenu() {
  document.body.classList.remove('menu-open');
}

export const Layout = props => (
  <div>
    <Head>
      <link rel="icon" href="/favicon.ico"/>
      <link rel="stylesheet" href="http://localhost:8082/style.css"/>
    </Head>
    <Header {...props.header}/>
    <section className="page-menu" onClick={() => onClickMenu()}>
      <PostList {...props.postList}/>
    </section>
    <section className="page-content">
      {props.children}
    </section>
  </div>
);

Layout.getInitialProps = async function(context) {
  return {
    postList: await PostList.getInitialProps(context),
    header: await Header.getInitialProps(context)
  };
};

export default Layout;


