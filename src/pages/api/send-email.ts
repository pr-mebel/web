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
        filename: any;
        path: any;
    }[];
}) => ({
    to: 'zakaz@pr-mebel.com',
    replyTo: email || 'zakaz@pr-mebel.com',
    message: {
        subject: `Расчет | ${name} | ${tel}`,
        html: `
            <p><strong>Имя:</strong><br>${name}</p>
            <p><strong>Телефон:</strong><br>${tel}</p>
            ${email && `<p><strong>Почта:</strong><br>${email}</p>`}
            ${description && `<p><strong>Описание:</strong><br>${description}</p>`}
        `,
        attachments,
    },
})

export default (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.body.email);
    const { email, name, tel, description, files } = req.body;
    const storageRef = storage().ref();

    if (files) {
        const refs = [...files].map((file) => storageRef.child(file.name).getDownloadURL());

        Promise.all(refs)
            .then((fileLinks) => {
                const attachments = fileLinks.map((fileLink, i) => ({
                    filename: [...files][i].name,
                    path: fileLink,
                }));

                firestore()
                    .collection('mail')
                    .add(messageBuilder({
                        email,
                        name,
                        tel,
                        description,
                        attachments
                    }))
                    .then(() => res.status(200))
            });
    } else {
        firestore()
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
