import multer from 'multer';
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

import { createMessage, createMeta, sendEmail } from '@/lib/send-email';
import { env } from '@/env';

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
      user: env.EMAIL_MAIL_RU,
      pass: env.PASSWORD_MAIL_RU,
    },
  });

  try {
    const info = await sendEmail(
      transporterMail,
      createMessage({
        emailTo: env.EMAIL_MAIL_RU,
        meta: metaResult,
        files,
        name,
        place,
        tel,
        description,
        email,
      }),
    );

    console.info('sent to mail.ru', info);

    res.status(200).json(info);
  } catch (error) {
    console.error('unable to send to mail.ru', error);
    res.status(500).json(error);
  }
};

export default sendRequestEmail;

export const config = {
  api: {
    bodyParser: false,
  },
};
