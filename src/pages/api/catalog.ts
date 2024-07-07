import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '@/api/client';
import { Item, SectionCollection, SectionID } from '@/entities';
import { makeRequest } from '@/lib/catalog';

const catalog = async (req: NextApiRequest, res: NextApiResponse) => {
  const { section } = req.body as {
    section: SectionID;
  };

  try {
    const items = [] as Item[];
    let total = 0;

    do {
      const data = await client.query<{ result: SectionCollection }>({
        query: makeRequest(section, items.length),
      });

      total = data.data.result.items[0].cardsCollection.total;
      items.push(...data.data.result.items[0].cardsCollection.items);
    } while (items.length !== total);

    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default catalog;
