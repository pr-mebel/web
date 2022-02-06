import { Prisma } from '@prisma/client';
import { captureException, withSentry } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';

type Body = {
    email?: string;
    name: string;
    tel: string;
    place: string;
    description?: string;
    meta?: Prisma.JsonObject;
};

const handleException = (error: unknown, source: string, other: Record<string, unknown>) => {
    captureException(error, {
        extra: {
            source,
            ...other,
        },
    });
};

const logRequestToDB = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, name, tel, description, meta = {}, place } = req.body as Body;

    if (req.cookies['_ym_uid']) {
        meta['_ym_uid'] = req.cookies['_ym_uid'];
    }

    try {
        await prisma.orders.create({
            data: {
                name,
                tel,
                place,
                createdAt: new Date(),
                email,
                text: description,
                meta,
            },
        });

        console.info('written to database');
    } catch (error) {
        handleException(error, 'database', req.body);
        console.error('unable to write to database', {
            error: error as string,
        });
        res.status(500).json(error);
    }

    res.status(200).json('success');
};

export default withSentry(logRequestToDB);
