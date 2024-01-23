import { ApolloClient, InMemoryCache } from '@apollo/client';

/**
 * Клиент для обращения к contentful CMS
 */
export const client = new ApolloClient({
    uri: process.env.CONTENTFUL_URI,
    headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
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
