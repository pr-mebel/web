import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import nodemailer from 'nodemailer';
import { promises as fs } from 'fs';

const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
});

const apiRoute = nextConnect({
    onNoMatch(req: NextApiRequest, res: NextApiResponse) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

const uploadMiddleware = upload.array('theFiles');

apiRoute.use(uploadMiddleware);

interface Request extends NextApiRequest {
    files: Express.Multer.File[];
}

apiRoute.post(async (req: Request, res: NextApiResponse) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.mail.ru',
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAILRU_USER,
                pass: process.env.MAILRU_PASS,
            },
        });

        res.status(200).json({ data: 'success' });

        await transporter.sendMail({
            from: process.env.MAILRU_USER,
            to: process.env.MAILRU_USER,
            replyTo: 'zakaz@pr-mebel.ru',
            subject: 'TEST',
            text: 'Hello world?',
            html: '<b>Hello world?</b>',
            attachments: req.files.map((file) => ({
                filename: file.filename,
                path: file.path,
            })),
        });

        await Promise.all(req.files.map((file) => fs.unlink(file.path)));

        console.log('finished');
    } catch (error) {
        res.status(500).json(error);
    }
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false,
    },
};
