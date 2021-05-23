import React from 'react';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import createStore from '../redux/store';
import theme from '../utils/theme';
import { Provider as AuthProvider } from 'next-auth/client';
import Popup from '../components/Popup/Popup';
import { PopupContext } from '../context/PopupContext';
import { usePopup } from '../hooks/popup.hook';

 
function MyApp({ Component, pageProps, store }) {
  const popupHook = usePopup()
  return (
    <AuthProvider session={pageProps.session}>
      <PopupContext.Provider value={popupHook}>
      <Provider store={store}>
        <Head>
          <title>Shipco</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
          <Popup></Popup>
        </ThemeProvider>
              
            </Provider>
      </PopupContext.Provider>
           
          </AuthProvider>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }

  export default withRedux(createStore)(MyApp);
