import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { Header } from 'components';
import Head from 'next/head';
import theme from 'theme';
import '../styles/globals.css';
import store from 'redux/store';

function MyApp({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Head>
            <meta charSet="utf-8" />
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="/fonts/index.css" rel="stylesheet" />
            <meta name="yandex-verification" content="6eb5436d905f1d91" />
            <meta name="description" content="Частный мебельер - салон мбели премиум-класса" />
            <title>Частный мебельер - салон мебели премиум-класса</title>
          </Head>

          <Header />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.any,
};

export default MyApp;
