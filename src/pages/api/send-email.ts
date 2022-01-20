import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import nodemailer from 'nodemailer';

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
    description?: string;
};

const sendEmailV2 = async (req: Request, res: NextApiResponse) => {
    await runMiddleware(req, res, uploadMiddleware);

    const { email, name, tel, description } = req.body as Body;

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

        const message = await transporter.sendMail({
            from: 'zakaz@pr-mebel.ru',
            to: 'zakaz@pr-mebel.ru',
            replyTo: email || 'zakaz@pr-mebel.ru',
            subject: `[ТЕСТ] Расчет | ${name} | ${tel}`,
            html: `
                <p><strong>Имя:</strong><br>${name}</p>
                <p><strong>Телефон:</strong><br>${tel}</p>
                ${email ? `<p><strong>Почта:</strong><br>${email}</p>` : ''}
                ${
                    description
                        ? `<p><strong>Описание:</strong><br>${description}</p>`
                        : ''
                }
            `,
            attachments: req.files.map((file) => ({
                filename: file.filename,
                content: file.buffer,
                contentType: file.mimetype,
            })),
        });

        console.log(message);

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
