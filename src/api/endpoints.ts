import { hosts } from './hosts';

export const endpoints = {
    getCaltalogByFilter: `${hosts.vercel}/catalog`,
    getFaq: `${hosts.vercel}/faq`,
    logRequestToDB: `${hosts.vercel}/log-request-to-db`,
    sendRequestEmail: `${hosts.vercel}/send-request-email`,
};
