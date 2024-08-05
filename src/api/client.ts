import { ApolloClient, InMemoryCache } from '@apollo/client';

import { env } from '@/env';

/**
 * Клиент для обращения к contentful CMS
 */
export const client = new ApolloClient({
  uri: env.CONTENTFUL_URI,
  headers: {
    'content-type': 'application/json',
    authorization: `Bearer ${env.CONTENTFUL_ACCESS_TOKEN}`,
  },
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});
