import { withSentry } from '@sentry/nextjs';
import multer from 'multer';
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

import { createMessage, createMeta, sendEmail } from '@/lib/send-email';
import { logException } from '@/lib/sentry';

const upload = multer({
    storage: multer.memoryStorage(),
});

const uploadMiddleware = upload.array('files');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: unknown) => {
            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });
};

type MulterBody = NextApiRequest & {
    files: Express.Multer.File[];
};

type Body = {
    email?: string;
    name: string;
    tel: string;
    place: string;
    description?: string;
    meta?: string;
};

const sendRequestEmail = async (req: NextApiRequest, res: NextApiResponse) => {
    await runMiddleware(req, res, uploadMiddleware);

    const { email, name, tel, description, meta = '', place } = req.body as Body;
    const { files } = req as MulterBody;

    const metaResult = createMeta(meta, req.cookies, req.headers);

    const transporterMail = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
            user: 'zakaz@pr-mebel.ru',
            pass: 'nobiele000',
        },
    });

    const transporterYandex = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true,
        auth: {
            user: 'nobieleadv@yandex.ru',
            pass: 'Nobie111@',
        },
    });

    try {
        const [mailRuInfo, yandexInfo] = await Promise.all([
            sendEmail(
                transporterMail,
                createMessage({
                    emailTo: 'zakaz@pr-mebel.ru',
                    meta: metaResult,
                    files,
                    name,
                    place,
                    tel,
                    description,
                    email,
                })
            ),
            sendEmail(
                transporterYandex,
                createMessage({
                    emailTo: 'nobieleadv@yandex.ru',
                    meta: metaResult,
                    files,
                    name,
                    place,
                    tel,
                    description,
                    email,
                })
            ),
        ]);

        const info = {
            'zakaz@pr-mebel.ru': mailRuInfo,
            'nobieleadv@yandex.ru': yandexInfo,
        };

        console.info('sent to mail.ru', info);

        res.status(200).json(info);
    } catch (error) {
        logException(error, 'mail.ru', req.body);
        console.error('unable to send to mail.ru', error);
        res.status(500).json(error);
    }
};

export default withSentry(sendRequestEmail);

export const config = {
    api: {
        bodyParser: false,
    },
};
