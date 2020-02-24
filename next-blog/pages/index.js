import Head from 'next/head'
import Layout from '../components/Layout'
import React from 'react';

const Home = props => (
  <Layout { ...props.layoutProps } >
    <Head>
      <title>Home</title>
    </Head>
    <p>Hello, Home</p>
  </Layout>
);


Home.getInitialProps = async function(context) {
  await Layout.getInitialProps();
  return {
    layoutProps: await Layout.getInitialProps(context)
  };
};

export default Home
