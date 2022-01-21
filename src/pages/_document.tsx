import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '@/theme';

/**
 * https://material-ui.com/styles/advanced/#next-js
 */
export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="ru">
                <Head>
                    {/* PWA primary color */}
                    <meta
                        name="theme-color"
                        content={theme.palette.primary.main}
                    />
                    <meta
                        content="af51c3e9352991d1"
                        name="yandex-verification"
                    />
                    <meta
                        content="fe86c27432cb6049"
                        name="yandex-verification"
                    />
                    <meta
                        content="5stp2baz27773j5xm7q9o0torwuokr"
                        name="facebook-domain-verification"
                    />
                    <meta
                        content="3287bb5b0336ebb7"
                        name="yandex-verification"
                    />
                </Head>
                <body>
                    {process.env.VERCEL_ENV === 'production' && (
                        <>
                            {/* Google Tag Manager */}
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: `
                                    <script>(function (w, d, s, l, i) {
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
                                    })(window, document, 'script', 'dataLayer', 'GTM-5G36Q89');</script>
                                    <noscript>
                                        <iframe height="0"
                                                src="https://www.googletagmanager.com/ns.html?id=GTM-5G36Q89" style="display:none;visibility:hidden" width="0"></iframe>
                                    </noscript>
                                `,
                                }}
                            />
                            {/* Google Analytics */}
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: `
                                <script>
                                    window.ga = window.ga || function () {
                                        (ga.q = ga.q || []).push(arguments)
                                    };
                                    ga.l = +new Date;
                                    ga('create', 'UA-145856436-1', 'auto');
                                    ga('send', 'pageview');
                                </script>
                                <script async src='https://www.google-analytics.com/analytics.js'></script>
                                `,
                                }}
                            />
                            {/* Yandex Metrika [54949111, 86537628] */}
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: `
                                    <script type="text/javascript" >
                                        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
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
                                        });
                                    </script>
                                    <noscript>
                                        <div>
                                            <img alt="" src="https://mc.yandex.ru/watch/54949111" style="position:absolute; left:-9999px;"/>
                                            <img alt="" src="https://mc.yandex.ru/watch/86537628" style="position:absolute; left:-9999px;"/>
                                        </div>
                                    </noscript>
                                    `,
                                }}
                            />
                            {/* Bitrix messenger */}
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: `
                                        <!-- Bitrix -->
                                            <script>
                                                (function(w,d,u){
                                                    var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);
                                                    var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
                                                })(window,document,'https://cdn-ru.bitrix24.ru/b2399491/crm/site_button/loader_3_q6v4tx.js');
                                            </script>
                                        <!-- End Bitrix -->`,
                                }}
                            />
                            {/* Facebook Pixel Code */}
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: `
                                        <script>
                                        !function(f,b,e,v,n,t,s)
                                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                        n.queue=[];t=b.createElement(e);t.async=!0;
                                        t.src=v;s=b.getElementsByTagName(e)[0];
                                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                                        'https://connect.facebook.net/en_US/fbevents.js');
                                        fbq('init', '364548827793450');
                                        fbq('track', 'PageView');
                                        </script>
                                        <noscript><img height="1" width="1" style="display:none"
                                        src="https://www.facebook.com/tr?id=364548827793450&ev=PageView&noscript=1"
                                        /></noscript>`,
                                }}
                            />
                            {/* Rating Mail.ru counter */}
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: `
                                    <script>
                                        var _tmr = window._tmr || (window._tmr = []);
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
                                        })(document, window, "topmailru-code");
                                    </script>
                                    <noscript>
                                        <div><img alt="Top.Mail.Ru" src="https://top-fwz1.mail.ru/counter?id=3136628;js=na"
                                                style="border:0;position:absolute;left:-9999px;"/></div>
                                    </noscript>
                                `,
                                }}
                            />
                        </>
                    )}
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    // eslint-disable-next-line no-param-reassign
    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [
            ...React.Children.toArray(initialProps.styles),
            sheets.getStyleElement(),
        ],
    };
};
