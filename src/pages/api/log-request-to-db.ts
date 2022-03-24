import { Prisma } from '@prisma/client';
// import { withSentry } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';
import { createMeta } from '@/lib/send-email';
// import { logException } from '@/lib/sentry';

type Body = {
    email?: string;
    name: string;
    tel: string;
    place: string;
    description?: string;
    meta?: Record<string, unknown>;
};

const logRequestToDB = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, name, tel, description, meta = {}, place } = req.body as Body;

    const metaResult = createMeta(meta, req.cookies, req.headers);

    try {
        await prisma.orders.create({
            data: {
                name,
                tel,
                place,
                createdAt: new Date(),
                email,
                text: description,
                meta: metaResult as Prisma.JsonObject,
            },
        });

        console.info('written to database');
    } catch (error) {
        // logException(error, 'database', req.body);
        console.error('unable to write to database', {
            error: error as string,
        });
        res.status(500).json(error);
    }

    res.status(200).json('success');
};

export default logRequestToDB;
// export default withSentry(logRequestToDB);
