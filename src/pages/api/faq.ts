import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '@/api/client';
import { makeRequest } from '@/lib/faq';

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
      query: makeRequest(),
    });

    return res.status(200).json(resp.data.faqList.itemsCollection.items);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default faq;
