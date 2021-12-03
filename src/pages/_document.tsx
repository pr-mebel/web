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
                </Head>
                <body>
                    {process.env.VERCEL_ENV === 'production' && (
                        <>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: `
                                    <!-- Yandex.Metrika counter -->
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
                                    </script>
                                    <noscript><div><img src="https://mc.yandex.ru/watch/54949111" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
                                    <!-- /Yandex.Metrika counter -->
                                    `,
                                }}
                            />
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
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: `
                                    <!-- Facebook Pixel Code -->
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
                                        /></noscript>
                                    <!-- End Facebook Pixel Code -->`,
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
