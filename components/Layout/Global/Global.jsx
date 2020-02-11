import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import './Global.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Global = ({ children }) => (
  <>
    <Head>
      <title>Home</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {process.env.NODE_ENV !== 'production' && (
        <link
          rel="stylesheet"
          type="text/css"
          href={`/_next/static/css/styles.chunk.css?v=${Date.now()}`}
        />
      )}
    </Head>
    <Header />
    {children}
    <Footer />
  </>
);

Global.propTypes = {
  children: PropTypes.node,
};

export default Global;
