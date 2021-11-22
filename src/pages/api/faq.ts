import type { NextApiRequest, NextApiResponse } from 'next';
// import { gql } from '@apollo/client';
// import { ApolloClient, InMemoryCache } from '@apollo/client';

// const FAQEntityID = '50kulGjR4KrEMHAomWqIgM';

export type FetchFAQRespone = {
    faqList: {
        itemsCollection: {
            items: {
                title: string;
                text: string;
            }[];
        };
    };
};

const faq = async (_: NextApiRequest, res: NextApiResponse) => {
    // const accessToken =
    //     process.env.NODE_ENV === 'production'
    //         ? process.env.CONTENTFUL_ACCESS_TOKEN
    //         : process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;

    // /**
    //  * Клиент для обращения к contentful CMS
    //  */
    // const client = new ApolloClient({
    //     uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`,
    //     headers: {
    //         'content-type': 'application/json',
    //         authorization: `Bearer ${accessToken}`,
    //     },
    //     cache: new InMemoryCache(),
    // });

    try {
        // const resp = await client.query<FetchFAQRespone>({
        //     query: gql`
        //         {
        //             faqList(id: "${FAQEntityID}") {
        //                 itemsCollection {
        //                     items {
        //                         title
        //                         text
        //                     }
        //                 }
        //             }
        //         }
        //     `,
        // });

        return res.status(200).json(JSON.stringify(process.env));
    } catch (error) {
        return res.status(500).json(error);
    }
};

export default faq;
