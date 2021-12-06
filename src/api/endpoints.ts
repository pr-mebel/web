import { hosts } from './hosts';

export const endpoints = {
    getCaltalogByFilter: `${hosts.vercel}/catalog`,
    getFaq: `${hosts.vercel}/faq`,
    sendEmail: `${hosts.heroku}/send-email`,
};
