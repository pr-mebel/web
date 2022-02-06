import { Prisma } from '@prisma/client';
import { captureException, withSentry } from '@sentry/nextjs';
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

type CreateMessageParams = {
    emailTo?: string;
    email?: string;
    name: string;
    tel: string;
    place: string;
    description?: string;
    meta: Record<string, unknown>;
    files: Express.Multer.File[];
};

const createMessage = ({ emailTo = '', files, name, place, tel, description, email, meta }: CreateMessageParams) => {
    const currentTime = format(new Date(), dateTemplateWithTime);

    return {
        from: {
            address: emailTo,
            name: `${place} | ${tel} | ${currentTime}`,
        },
        to: emailTo,
        replyTo: email || emailTo,
        subject: `${name} | ${tel} | ${currentTime}`,
        html: `
            <p><strong>Кнопка:</strong><br>${place}</p>
            <p><strong>Имя:</strong><br>${name}</p>
            <p><strong>Телефон:</strong><br>${tel}</p>
            <p><strong>Почта:</strong><br>${email || '-'}</p>
            <p><strong>Описание:</strong><br>${description || '-'}</p>
            <hr>
            <p>Дополнительная информация<br>
                ${Object.entries(meta).reduce((acc, val) => `${acc}<p><strong>${val[0]}:</strong> ${val[1]}</p>`, '')}
            </p>
        `,
        attachments: files.map((file) => ({
            filename: file.filename,
            content: file.buffer,
            contentType: file.mimetype,
        })),
    };
};

const handleException = (error: unknown, source = '', other: Record<string, unknown>) => {
    captureException(error, {
        extra: {
            source,
            ...other,
        },
    });
};

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
    await runMiddleware(req, res, uploadMiddleware);

    const { email, name, tel, description, meta, place } = req.body as Body;
    const { files } = req as MulterBody;

    const parsedMeta: Prisma.JsonObject = meta ? JSON.parse(meta) : {};

    if (req.cookies['_ym_uid']) {
        parsedMeta['_ym_uid'] = req.cookies['_ym_uid'];
    }

    console.info('init mail.ru smtp with', process.env.EMAIL_MAIL_RU, process.env.PASSWORD_MAIL_RU);
    const transporterMail = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        logger: true,
        debug: true,
        auth: {
            user: process.env.EMAIL_MAIL_RU,
            pass: process.env.PASSWORD_MAIL_RU,
        },
    });

    await transporterMail.verify((...params) => console.info('verify mail.ru transporter', ...params));

    console.info('init yandex smtp with', process.env.EMAIL_YANDEX, process.env.PASSWORD_YANDEX);
    const transporterYandex = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true,
        logger: true,
        debug: true,
        auth: {
            user: process.env.EMAIL_YANDEX,
            pass: process.env.PASSWORD_YANDEX,
        },
    });

    await transporterYandex.verify((...params) => console.info('verify yandex transporter', ...params));

    try {
        const response = await prisma.orders.create({
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

        console.info('written to database successfully', response);
    } catch (error) {
        handleException(error, 'database', req.body);
        console.error(error);
    }

    try {
        const response = await transporterMail.sendMail(
            createMessage({
                emailTo: process.env.EMAIL_MAIL_RU,
                meta: parsedMeta,
                files,
                name,
                place,
                tel,
                description,
                email,
            }),
            (error) => {
                if (error) {
                    console.error(error);
                }
            }
        );
        console.info('sent to', process.env.EMAIL_MAIL_RU, response);
    } catch (error) {
        handleException(error, process.env.EMAIL_MAIL_RU, req.body);
        console.error(error);
        res.status(500).json(error);
    }

    try {
        const response = await transporterYandex.sendMail(
            createMessage({
                emailTo: process.env.EMAIL_YANDEX,
                meta: parsedMeta,
                files,
                name,
                place,
                tel,
                description,
                email,
            }),
            (error) => {
                if (error) {
                    console.error(error);
                }
            }
        );
        console.info('sent to ', process.env.EMAIL_YANDEX, response);
    } catch (error) {
        handleException(error, process.env.EMAIL_YANDEX, req.body);
        console.error(error);
        res.status(500).json(error);
    }

    res.status(200).json('success');
};

export default withSentry(sendEmail);

export const config = {
    api: {
        bodyParser: false,
    },
};
