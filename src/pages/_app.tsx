import '../styles/globals.css';

import { ThemeProvider } from '@material-ui/core/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { FC } from 'react';
import { Provider } from 'react-redux';

import { Footer, FormSubmitPopup, GoTopButton, Header, OrderFormPopup } from '@/components';
import store from '@/redux/store';
import { ScriptsList } from '@/scripts/sciprts-list';
import theme from '@/theme';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
    return (
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
                        <meta name="canonical" content="https://pr-mebel.com" />
                        <title>Частный мебельер - салон мебели премиум-класса</title>
                        {/* PWA primary color */}
                        <meta name="theme-color" content={theme.palette.primary.main} />
                        <meta content="af51c3e9352991d1" name="yandex-verification" />
                        <meta content="fe86c27432cb6049" name="yandex-verification" />
                        <meta content="5stp2baz27773j5xm7q9o0torwuokr" name="facebook-domain-verification" />
                        <meta content="3287bb5b0336ebb7" name="yandex-verification" />
                    </Head>

                    <ScriptsList />

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
};

export default MyApp;
