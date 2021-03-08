import { ApolloClient, InMemoryCache } from '@apollo/client';

const accessToken = 'fdV0zbOg0XHXWUzvuHbB-G_auexFcqXdcaKrG6ntxUc';

/**
 * Клиент для обращения к contentful CMS
 */
export const client = new ApolloClient({
    uri: 'https://graphql.contentful.com/content/v1/spaces/u9cvun9ln2na/',
    headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${accessToken}`,
    },
    cache: new InMemoryCache(),
});
