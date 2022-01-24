import '../styles/globals.css';

import { ThemeProvider } from '@material-ui/core/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import React, { FC } from 'react';
import { Provider } from 'react-redux';

import { Footer, FormSubmitPopup, GoTopButton, Header, OrderFormPopup } from '@/components';
import store from '@/redux/store';
import theme from '@/theme';
import { isProduction } from '@/utils';

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

                {console.log(isProduction())}

                {isProduction() && (
                    <>
                        {/* Google Tag Manager */}
                        <Script id="google-tag-manager" strategy="afterInteractive">
                            {`(function (w, d, s, l, i) {
                                        w[l] = w[l] || [];
                                        w[l].push({
                                            'gtm.start':
                                                new Date().getTime(), event: 'gtm.js'
                                        });
                                        var f = d.getElementsByTagName(s)[0],
                                            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
                                        j.async = true;
                                        j.src =
                                            'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                                        f.parentNode.insertBefore(j, f);
                                    })(window, document, 'script', 'dataLayer', 'GTM-5G36Q89');`}
                        </Script>
                        {/* Google Analytics */}
                        <Script id="google-analytics" strategy="afterInteractive">
                            {`window.ga = window.ga || function () {
                                        (ga.q = ga.q || []).push(arguments)
                                    };
                                    ga.l = +new Date;
                                    ga('create', 'UA-145856436-1', 'auto');
                                    ga('send', 'pageview');`}
                        </Script>
                        <Script src="https://www.google-analytics.com/analytics.js" strategy="afterInteractive" />
                        {/* Yandex Metrika [54949111, 86537628] */}
                        <Script id="yandex-metrika" strategy="afterInteractive">
                            {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                                        m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                                        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                                    
                                        ym(54949111, "init", {
                                            clickmap:true,
                                            trackLinks:true,
                                            accurateTrackBounce:true,
                                            webvisor:true,
                                            trackHash:true
                                        });

                                        ym(86537628, "init", {
                                            clickmap: true,
                                            trackLinks: true,
                                            accurateTrackBounce: true,
                                            trackHash: true
                                        });`}
                        </Script>
                        {/* Bitrix messenger */}
                        <Script id="bitrix-manager" strategy="lazyOnload">
                            {`(function(w,d,u){
                                                    var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);
                                                    var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
                                                })(window,document,'https://cdn-ru.bitrix24.ru/b2399491/crm/site_button/loader_3_q6v4tx.js');`}
                        </Script>
                        {/* Facebook Pixel Code */}
                        <Script id="facebook-pixel" strategy="afterInteractive">
                            {`!function(f,b,e,v,n,t,s)
                                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                        n.queue=[];t=b.createElement(e);t.async=!0;
                                        t.src=v;s=b.getElementsByTagName(e)[0];
                                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                                        'https://connect.facebook.net/en_US/fbevents.js');
                                        fbq('init', '364548827793450');
                                        fbq('track', 'PageView');`}
                        </Script>
                        {/* Rating Mail.ru counter */}
                        <Script id="mail.ru-counter" strategy="afterInteractive">
                            {`var _tmr = window._tmr || (window._tmr = []);
                                        _tmr.push({id: "3136628", type: "pageView", start: (new Date()).getTime(), pid: "USER_ID"});
                                        (function (d, w, id) {
                                            if (d.getElementById(id)) return;
                                            var ts = d.createElement("script");
                                            ts.type = "text/javascript";
                                            ts.async = true;
                                            ts.id = id;
                                            ts.src = "https://top-fwz1.mail.ru/js/code.js";
                                            var f = function () {
                                                var s = d.getElementsByTagName("script")[0];
                                                s.parentNode.insertBefore(ts, s);
                                            };
                                            if (w.opera == "[object Opera]") {
                                                d.addEventListener("DOMContentLoaded", f, false);
                                            } else {
                                                f();
                                            }
                                        })(document, window, "topmailru-code");`}
                        </Script>
                    </>
                )}

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
