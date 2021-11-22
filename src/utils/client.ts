import { ApolloClient, InMemoryCache } from '@apollo/client';

const accessToken =
    process.env.NODE_ENV === 'production'
        ? process.env.CONTENTFUL_ACCESS_TOKEN
        : process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;

console.log(
    process.env.NODE_ENV,
    process.env.CONTENTFUL_ACCESS_TOKEN,
    process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
);

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
});
