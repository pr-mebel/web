import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { endpoints } from '../endpoints';
import { SendEmailParams } from '../types';

type UseSendEmailParams = {
    place: string;
};

const sendEmail = ({ name, tel, description, email, files, place, meta = {} }: SendEmailParams): Promise<void> => {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('tel', tel);
    formData.append('email', email || '');
    formData.append('description', description || '');
    formData.append('place', place);
    formData.append('meta', JSON.stringify(meta));
    files?.forEach((file) => {
        formData.append('files', file);
    });

    return axios.post(endpoints.sendEmail, formData, {
        headers: { 'content-type': 'multipart/form-data' },
    });
};

export const useSendEmail = ({ place }: UseSendEmailParams) => {
    const router = useRouter();

    const handleSendEmail = useCallback(
        async (values: Omit<SendEmailParams, 'place'>) => {
            const utm = localStorage.getItem('utm');

            sendEmail({
                ...values,
                place,
                meta: {
                    ...values.meta,
                    URL: router.pathname,
                    ...(utm ? JSON.parse(utm) : {}),
                },
            });
        },
        [router, place]
    );

    return {
        onSendEmail: handleSendEmail,
    };
};
