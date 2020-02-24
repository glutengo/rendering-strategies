import Head from 'next/head'
import Layout from '../../components/Layout'
import React from 'react';
import 'isomorphic-fetch';

const Post = props => (
  <Layout { ...props.layoutProps } >
    <Head>
      <title>{props.id}</title>
      <meta property="og:title" content={props.id}/>
    </Head>
    <div className="post" dangerouslySetInnerHTML={{__html: props.content}}></div>
  </Layout>
);


Post.getInitialProps = async function(context) {
  const content = await (await fetch(`http://localhost:8082/post/${context.query.id}`)).text();
  return {
    layoutProps: await Layout.getInitialProps(context),
    content,
    id: context.query.id
  };
};

export default Post;
