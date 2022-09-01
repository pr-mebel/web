import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '@/api/client';
import { SectionCollection, SectionID } from '@/entities';
import { makeRequest } from '@/lib/catalog';

const catalog = async (req: NextApiRequest, res: NextApiResponse) => {
    const { section } = req.body as {
        section: SectionID;
    };

    try {
        const data = await client.query<{ result: SectionCollection }>({ query: makeRequest(section) });

        return res.status(200).json(data.data.result.items[0].cardsCollection.items);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export default catalog;
