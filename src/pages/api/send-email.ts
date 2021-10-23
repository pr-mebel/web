import type { NextApiRequest, NextApiResponse } from 'next';
import { storage, firestore } from '@/lib';

const messageBuilder = ({
    email,
    name,
    tel,
    description,
    attachments,
}: {
    email?: string;
    name: string;
    tel: string;
    description?: string;
    attachments?: {
        filename: unknown;
        path: unknown;
    }[];
}) => ({
    to: 'zakaz@pr-mebel.com',
    replyTo: email || 'zakaz@pr-mebel.com',
    message: {
        subject: `Расчет | ${name} | ${tel}`,
        html: `
            <p><strong>Имя:</strong><br>${name}</p>
            <p><strong>Телефон:</strong><br>${tel}</p>
            ${email ? `<p><strong>Почта:</strong><br>${email}</p>` : ''}
            ${description ? `<p><strong>Описание:</strong><br>${description}</p>` : ''}
        `,
        attachments,
    },
});

type Body = {
    email?: string;
    name: string;
    tel: string;
    description?: string;
    files?: FileList;
}

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, name, tel, description, files } = req.body as Body;
    const storageRef = storage().ref();

    if (files) {
        const refs = [...files]
            .map((file) => storageRef.child(file.name).getDownloadURL() as Promise<string>);

        await Promise.all(refs)
            .then(async (fileLinks) => {
                const attachments = fileLinks.map((fileLink, i) => ({
                    filename: [...files][i].name,
                    path: fileLink,
                }));

                await firestore()
                    .collection('mail')
                    .add(messageBuilder({
                        email,
                        name,
                        tel,
                        description,
                        attachments,
                    }))
                    .then(() => res.status(200));
            });
    } else {
        await firestore()
            .collection('mail')
            .add(messageBuilder({
                email,
                name,
                tel,
                description,
            }))
            .then(() => res.json(200));
    }
};

export default sendEmail;