import multer from 'multer';
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

import { dateTemplateWithTime } from '@/constants';
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

interface Request extends NextApiRequest {
    files: Express.Multer.File[];
}

type Body = {
    email?: string;
    name: string;
    tel: string;
    place: string;
    description?: string;
    meta?: string;
};

const sendEmailV2 = async (req: Request, res: NextApiResponse) => {
    await runMiddleware(req, res, uploadMiddleware);

    const { email, name, tel, description, meta, place } = req.body as Body;

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.mail.ru',
            port: 465,
            secure: true,
            auth: {
                user: 'zakaz@pr-mebel.ru',
                pass: 'nobiele000',
            },
        });

        const currentTime = format(new Date(), dateTemplateWithTime);

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
                ${
                    meta
                        ? `
                    <p>Дополнительная информация<br>
                        ${Object.entries(JSON.parse(meta)).reduce(
                            (acc, val) => `${acc}<p><strong>${val[0]}:</strong> ${val[1]}</p>`,
                            ''
                        )}
                    </p>`
                        : ''
                }
            `,
                attachments: req.files.map((file) => ({
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

        res.status(200).json({ data: 'success' });
    } catch (error) {
        res.status(500).json(error);
    }
};

export default sendEmailV2;

export const config = {
    api: {
        bodyParser: false,
    },
};
