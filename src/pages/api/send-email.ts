import { Prisma } from '@prisma/client';
import { withSentry } from '@sentry/nextjs';
import multer from 'multer';
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

import { dateTemplateWithTime } from '@/constants';
import { prisma } from '@/lib/prisma';
import { format } from '@/utils';

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

const sendEmailV2 = async (req: NextApiRequest, res: NextApiResponse) => {
    await runMiddleware(req, res, uploadMiddleware);

    const { email, name, tel, description, meta, place } = req.body as Body;
    const { files } = req as MulterBody;

    const parsedMeta: Prisma.JsonObject = meta ? JSON.parse(meta) : {};

    if (req.cookies['_ym_uid']) {
        parsedMeta['_ym_uid'] = req.cookies['_ym_uid'];
    }

    const currentTime = format(new Date(), dateTemplateWithTime);

    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
            user: 'zakaz@pr-mebel.ru',
            pass: 'nobiele000',
        },
    });

    try {
        await prisma.orders.create({
            data: {
                name,
                tel,
                place,
                createdAt: new Date(),
                email,
                text: description,
                meta: parsedMeta,
            },
        });

        await transporter.sendMail(
            {
                from: {
                    address: 'zakaz@pr-mebel.ru',
                    name: `${place} | ${tel} | ${currentTime}`,
                },
                to: 'zakaz@pr-mebel.ru',
                replyTo: email || 'zakaz@pr-mebel.ru',
                subject: `${name} | ${tel} | ${currentTime}`,
                html: `
                <p><strong>Кнопка:</strong><br>${place}</p>
                <p><strong>Имя:</strong><br>${name}</p>
                <p><strong>Телефон:</strong><br>${tel}</p>
                <p><strong>Почта:</strong><br>${email || '-'}</p>
                <p><strong>Описание:</strong><br>${description || '-'}</p>
                <hr>
                <p>Дополнительная информация<br>
                    ${Object.entries(parsedMeta).reduce(
                        (acc, val) => `${acc}<p><strong>${val[0]}:</strong> ${val[1]}</p>`,
                        ''
                    )}
                </p>
            `,
                attachments: files.map((file) => ({
                    filename: file.filename,
                    content: file.buffer,
                    contentType: file.mimetype,
                })),
            },
            (error, info) => {
                console.log(error, info);
                res.status(200).json({ error, info });
            }
        );
    } catch (error) {
        res.status(500).json(error);
    }
};

export default withSentry(sendEmailV2);

export const config = {
    api: {
        bodyParser: false,
    },
};
