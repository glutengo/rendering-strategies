import Head from 'next/head'
import Layout from '../components/Layout'
import React from 'react';

const Home = props => (
  <Layout { ...props.layoutProps } >
    <Head>
      <title>Next Blog</title>
    </Head>
  </Layout>
);


Home.getInitialProps = async function(context) {
  context.res.writeHead(302, { Location: '/posts/home' });
  context.res.end();
};

export default Home
