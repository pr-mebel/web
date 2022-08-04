export const GoogleTagManger = `
    (function (w, d, s, l, i) {
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
    })(window, document, 'script', 'dataLayer', 'GTM-5G36Q89');
`;

export const GoogleAnalytics = `
    window.ga = window.ga || function () {
        (ga.q = ga.q || []).push(arguments)
    };
    ga.l = +new Date;
    ga('create', 'UA-145856436-1', 'auto');
    ga('send', 'pageview');
`;

export const YandexMetrika = `
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
`;

export const BitrixMessenger = `
    (function(w,d,u){
        var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);
        var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
    })(window,document,'https://cdn-ru.bitrix24.ru/b2399491/crm/site_button/loader_3_q6v4tx.js');
`;

export const FacebookPixel = `
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
`;

export const MailRuCounter = `
    var _tmr = window._tmr || (window._tmr = []);
    _tmr.push({id: "3241411", type: "pageView", start: (new Date()).getTime(), pid: "USER_ID"});
    (function (d, w, id) {
    if (d.getElementById(id)) return;
    var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
    ts.src = "https://top-fwz1.mail.ru/js/code.js";
    var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
    if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
    })(document, window, "topmailru-code");
`;

export const VkCounter = `
    !function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src='https://vk.com/js/api/openapi.js?169',t.onload=function(){VK.Retargeting.Init("VK-RTRG-1378416-aoC9n"),VK.Retargeting.Hit()},document.head.appendChild(t)}();
`;

export const RoistatCounter = `
    (function(w, d, s, h, id) {
    w.roistatProjectId = id; w.roistatHost = h;
    var p = d.location.protocol == "https:" ? "https://" : "http://";
    var u = /^.*roistat_visit=[^;]+(.*)?$/.test(d.cookie) ? "/dist/module.js" : "/api/site/1.0/"+id+"/init?referrer="+encodeURIComponent(d.location.href);
    var js = d.createElement(s); js.charset="UTF-8"; js.async = 1; js.src = p+h+u; var js2 = d.getElementsByTagName(s)[0]; js2.parentNode.insertBefore(js, js2);
`;

export const RoistatIntegrationWithBitrixWidjets = `
    (function(w, d, s, h) {
    w.roistatLanguage = '';
    var p = d.location.protocol == "https:" ? "https://" : "http://";
    var u = "/static/marketplace/Bitrix24Widget/script.js";
    var js = d.createElement(s); js.async = 1; js.src = p+h+u; var js2 = d.getElementsByTagName(s)[0]; js2.parentNode.insertBefore(js, js2);
    })(window, document, 'script', 'cloud.roistat.com');
`;