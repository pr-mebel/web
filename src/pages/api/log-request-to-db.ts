import { Prisma } from '@prisma/client';
// import { withSentry } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

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

const logRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, name, tel, description, meta = {}, place } = req.body as Body;

    const metaResult = createMeta(meta, req.cookies, req.headers);

    // try {
    //     await prisma.orders.create({
    //         data: {
    //             name,
    //             tel,
    //             place,
    //             createdAt: new Date(),
    //             email,
    //             text: description,
    //             meta: metaResult as Prisma.JsonObject,
    //         },
    //     });
    //
    //     console.info('written to database');
    // } catch (error) {
    //     // logException(error, 'database', req.body);
    //     console.error('unable to write to database', {
    //         error: error as string,
    //     });
    //     res.status(500).json(error);
    // }

    const roistatData = {
        roistat: req.cookies['roistat_visit'] ? req.cookies['roistat_visit'] : 'nocookie',
        key: 'OTZjMmVlZTNkN2VmMzE1OGIxMjgyZmUwZTY2MjkxNTQ6MjIyOTcx',
        title: `Заявка с формы "${place}"`,
        comment: description ? description : null,
        name: name,
        phone: tel,
        email: email ? email : null,
        is_skip_sending: 0
    };

    try {
        await axios.get('https://cloud.roistat.com/api/proxy/1.0/leads/add', { params: roistatData});

        console.info('roistat: lead sended');
    } catch (error) {

        console.error('unable to send lead', {
            error: error as string,
        });
    }

    res.status(200).json('success');
};

export default logRequest;
// export default withSentry(logRequest);
