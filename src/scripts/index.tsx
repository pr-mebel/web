import Script from 'next/script';

import { isProduction } from '@/utils';

import {
    BitrixMessenger,
    FacebookPixel,
    GoogleAnalytics,
    GoogleTagManger,
    MailRuCounter,
    VkCounter,
    YandexMetrika,
} from './scripts';

export const ScriptsList = () => {
    if (!isProduction()) {
        return null;
    }

    return (
        <>
            <Script src="https://af.click.ru/af.js?id=10173" strategy="beforeInteractive" />
            <Script src="https://www.google-analytics.com/analytics.js" strategy="beforeInteractive" />
            <Script src="https://vk.com/js/api/openapi.js?144" strategy="beforeInteractive" />
            <Script
                id="google-tag-manager"
                dangerouslySetInnerHTML={{
                    __html: GoogleTagManger,
                }}
            />
            <Script
                id="google-analytics"
                dangerouslySetInnerHTML={{
                    __html: GoogleAnalytics,
                }}
            />
            <Script
                id="yandex-metrika"
                dangerouslySetInnerHTML={{
                    __html: YandexMetrika,
                }}
            />
            <Script
                id="facebook-pixel"
                dangerouslySetInnerHTML={{
                    __html: FacebookPixel,
                }}
            />
            <Script src="//cdn.callibri.ru/callibri.js" type="text/javascript" strategy="afterInteractive" />
            <Script
                id="mail.ru-raiting"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: MailRuCounter,
                }}
            />
            <Script
                id="bitrix-messenger"
                strategy="lazyOnload"
                dangerouslySetInnerHTML={{
                    __html: BitrixMessenger,
                }}
            />
            <Script
                id="bitrix-messenger"
                strategy="lazyOnload"
                dangerouslySetInnerHTML={{
                    __html: VkCounter,
                }}
            />
        </>
    );
};
