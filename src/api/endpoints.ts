import { hosts } from './hosts';

export const endpoints = {
    getCaltalogByFilter: `${hosts.vercel}/catalog`,
    getFaq: `${hosts.vercel}/faq`,
    logRequestToDB: `${hosts.vercel}/log-request-to-db`,
    sendRequestYandexRu: `${hosts.vercel}/send-request-yandex-ru`,
    sendRequestMailRu: `${hosts.vercel}/send-request-mail-ru`,
};
