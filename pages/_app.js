import React from 'react';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import { Provider, connect } from 'react-redux';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import createStore from '../redux/store';
import theme from '../utils/theme';
import { getCurrentUser } from '../redux/actions/currentUser';

class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    const { getUser } = this.props;
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    getUser({});
  }

  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <Head>
          <title>My page</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    );
  }
}

const mapDispatchToProps = {
  getUser: getCurrentUser,
};

export default withRedux(createStore)(connect(null, mapDispatchToProps)(MyApp));
