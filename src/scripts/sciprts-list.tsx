import Script from 'next/script';

import { isProduction } from '@/utils';

import { BitrixMessenger, FacebookPixel, GoogleAnalytics, GoogleTagManger, MailRuCounter, YandexMetrika } from '.';

export const ScriptsList = () => {
    if (!isProduction()) {
        return null;
    }

    return (
        <>
            <Script src="https://www.google-analytics.com/analytics.js" strategy="afterInteractive" />
            <Script
                id="google-tag-manager"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: GoogleTagManger,
                }}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: GoogleAnalytics,
                }}
            />
            <Script
                id="yandex-metrika"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: YandexMetrika,
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
                id="facebook-pixel"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: FacebookPixel,
                }}
            />
            <Script
                id="mail.ru-raiting"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: MailRuCounter,
                }}
            />
        </>
    );
};
