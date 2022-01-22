import { ApolloClient, InMemoryCache } from '@apollo/client';

import { isProduction } from '@/utils';

const accessToken = isProduction() ? process.env.CONTENTFUL_ACCESS_TOKEN : process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;

/**
 * Клиент для обращения к contentful CMS
 */
export const client = new ApolloClient({
    uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`,
    headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${accessToken}`,
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
