import { hosts } from './hosts';

export const endpoints = {
  getCaltalogByFilter: `${hosts.vercel}/catalog`,
  getFaq: `${hosts.vercel}/faq`,
  logRequest: `${hosts.vercel}/log-request`,
  sendRequestEmail: `${hosts.vercel}/send-request-email`,
};
