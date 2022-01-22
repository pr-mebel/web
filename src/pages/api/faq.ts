import { gql } from '@apollo/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '@/api/client';
import { isProduction } from '@/utils';

const FAQEntityID = '50kulGjR4KrEMHAomWqIgM';

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
    try {
        const resp = await client.query<FetchFAQRespone>({
            query: gql`
                {
                    faqList(id: "${FAQEntityID}", preview: ${!isProduction()}) {
                        itemsCollection {
                            items {
                                title
                                text
                            }
                        }
                    }
                }
            `,
        });

        return res.status(200).json(resp.data.faqList.itemsCollection.items);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export default faq;
