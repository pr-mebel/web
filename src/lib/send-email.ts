import { isObject } from 'lodash';
import { NextApiRequest } from 'next';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { dateTemplateWithTime } from '@/constants';
import { format } from '@/utils';

import { deviceDetector } from './device-detector';

type CreateMessageParams = {
    emailTo: string;
    email?: string;
    name: string;
    tel: string;
    place: string;
    description?: string;
    meta: Record<string, unknown>;
    files: Express.Multer.File[];
};

export const createMessage = ({ emailTo, files, name, place, tel, description, email, meta }: CreateMessageParams) => {
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
                ${Object.entries(meta).reduce((acc, val) => {
                    if (isObject(val[1])) {
                        return `${acc}<p><strong>${val[0]}:</strong> ${JSON.stringify(val[1])}</p>`;
                    }

                    return `${acc}<p><strong>${val[0]}:</strong> ${val[1]}</p>`;
                }, '')}
            </p>
        `,
        attachments: files.map((file) => ({
            filename: file.filename,
            content: file.buffer,
            contentType: file.mimetype,
        })),
    };
};

export const createMeta = (
    meta: Record<string, unknown> | string,
    cookies: NextApiRequest['cookies'],
    headers: NextApiRequest['headers']
) => {
    let result: Record<string, unknown> = {};

    if (typeof meta === 'string') {
        result = {
            ...result,
            ...JSON.parse(meta),
        };
    } else {
        result = {
            ...result,
            ...meta,
        };
    }

    if (headers['user-agent']) {
        const device = deviceDetector.parse(headers['user-agent']);

        if (device.os) {
            result['Операционная система'] = `${device.os.name}/${device.os.version}`;
        }

        if (device.client) {
            result['Браузер'] = `${device.client.name}/${device.client.version}`;
        }

        if (device.device) {
            result['Устройство'] = `${device.device.type} ${device.device.brand} ${device.device.model}`;
        }
    }

    if (cookies['_ym_uid']) {
        result['ID пользователя в Яндекс Метрике'] = cookies['_ym_uid'];
    }

    return result;
};

export const sendEmail = (transport: nodemailer.Transporter, params: Mail.Options) => {
    return new Promise((resolve, reject) => {
        transport.sendMail(params, (error, info) => {
            if (error) {
                return reject(error);
            }

            return resolve(info);
        });
    });
};
