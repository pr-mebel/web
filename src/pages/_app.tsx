import '../styles/globals.css';
import 'intersection-observer';

import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SnackbarProvider } from 'notistack';
import React, { FC, useEffect } from 'react';

import { Footer, GoTopButton, Header } from '@/blocks/common';
import { ScriptsList } from '@/scripts';
import { createEmotionCache, theme } from '@/theme';
import { trpc } from '@/trpc';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const MyApp: FC<MyAppProps> = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => {
    const router = useRouter();

    // Альтернатива document.referrer
    // https://www.grouparoo.com/blog/getting-previous-path-nextjs
    useEffect(() => {
        const prevPath = sessionStorage.getItem('currentPath');

        sessionStorage.setItem('prevPath', prevPath || '');
        sessionStorage.setItem('currentPath', router.pathname);
    }, [router.asPath, router.pathname]);

    return (
        <React.StrictMode>
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={theme}>
                    <ScriptsList />
                    <Head>
                        <meta charSet="utf-8" />
                        <link rel="icon" href="/favicon.ico" />
                        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                        <meta name="yandex-verification" content="6eb5436d905f1d91" />
                        <meta
                            name="description"
                            content="Мы создадим эксклюзивный проект будущего изделия, который
                    не просто идеально впишется в ваш интерьер, а будет комфортен,
                    удобен и функционален в использовании, и прослужит долгие годы."
                        />
                        <meta name="canonical" content="https://pr-mebel.com" />
                        <title>Частный мебельер - салон мебели премиум-класса</title>
                        <meta content="af51c3e9352991d1" name="yandex-verification" />
                        <meta content="fe86c27432cb6049" name="yandex-verification" />
                        <meta content="5stp2baz27773j5xm7q9o0torwuokr" name="facebook-domain-verification" />
                        <meta content="3287bb5b0336ebb7" name="yandex-verification" />
                        {/* Facebook Meta Tags */}
                        <meta property="og:url" content="https://pr-mebel.ru" />
                        <meta property="og:title" content="Частный мебельер - салон мебели премиум-класса" />
                        <meta
                            property="og:description"
                            content="Мы создаем эксклюзивный проект будущего изделия, который не просто идеально впишется в ваш интерьер, а будет комфортен, удобен и функционален в использовании, и прослужит долгие годы."
                        />
                        <meta
                            property="og:image"
                            content="https://images.ctfassets.net/u9cvun9ln2na/7xCjy27fsfaLeyan7Itntt/30c2f52f8ed579b344b00aaa7a501705/top-img3.jpg"
                        />
                        <meta property="og:image:width" content="300" />
                        <meta property="og:image:height" content="300" />
                        <meta property="og:type" content="website" />
                        {/* Twitter Meta Tags */}
                        <meta name="twitter:card" content="summary_large_image" />
                        <meta property="twitter:domain" content="pr-mebel.ru" />
                        <meta property="twitter:url" content="https://pr-mebel.ru" />
                        <meta name="twitter:title" content="Частный мебельер - салон мебели премиум-класса" />
                        <meta
                            name="twitter:description"
                            content="Мы создаем эксклюзивный проект будущего изделия, который не просто идеально впишется в ваш интерьер, а будет комфортен, удобен и функционален в использовании, и прослужит долгие годы."
                        />
                        <meta
                            name="twitter:image"
                            content="https://images.ctfassets.net/u9cvun9ln2na/7xCjy27fsfaLeyan7Itntt/30c2f52f8ed579b344b00aaa7a501705/top-img3.jpg"
                        />
                    </Head>
                    <CssBaseline />

                    <SnackbarProvider maxSnack={1}>
                        <Header />
                        <Component {...pageProps} />
                        <Footer />

                        <GoTopButton />
                    </SnackbarProvider>
                </ThemeProvider>
            </CacheProvider>
        </React.StrictMode>
    );
};

export default trpc.withTRPC(MyApp);
