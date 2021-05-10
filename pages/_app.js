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
import { Provider as AuthProvider } from 'next-auth/client';

class MyApp extends App {
  // componentDidMount() {
  //   const jssStyles = document.querySelector('#jss-server-side');
  //   const { getUser } = this.props;
  //   if (jssStyles) {
  //     jssStyles.parentElement.removeChild(jssStyles);
  //   }

  //   getUser({});
  // }

  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <AuthProvider session={pageProps.session}>
        <Provider store={store}>
          <Head>
            <title>Shipco</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </AuthProvider>
    );
  }
}

const mapDispatchToProps = {
  getUser: getCurrentUser,
};

export default withRedux(createStore)(connect(null, mapDispatchToProps)(MyApp));
