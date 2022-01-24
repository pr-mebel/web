import '../styles/globals.css';

import { ThemeProvider } from '@material-ui/core/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { FC } from 'react';
import { Provider } from 'react-redux';

import { Footer, FormSubmitPopup, GoTopButton, Header, OrderFormPopup } from '@/components';
import store from '@/redux/store';
import theme from '@/theme';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Head>
                    <meta charSet="utf-8" />
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="yandex-verification" content="6eb5436d905f1d91" />
                    <meta
                        name="description"
                        content="Мы создадим эксклюзивный проект будущего изделия, который
                не просто идеально впишется в ваш интерьер, а будет комфортен,
                удобен и функционален в использовании, и прослужит долгие годы."
                    />
                    <meta
                        name="og:description"
                        content="Мы создадим эксклюзивный проект будущего изделия, который
                не просто идеально впишется в ваш интерьер, а будет комфортен,
                удобен и функционален в использовании, и прослужит долгие годы."
                    />
                    <meta name="canonical" content="https://pr-mebel.com" />
                    <title>Частный мебельер - салон мебели премиум-класса</title>
                    <meta property="og:title" content="Частный мебельер - салон мебели премиум-класса" />
                    <meta property="og:locale" content="ru_RU" />
                </Head>

                <Header />
                <Component {...pageProps} />
                <Footer />

                <GoTopButton />
                <OrderFormPopup />
                <FormSubmitPopup />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);

export default MyApp;
