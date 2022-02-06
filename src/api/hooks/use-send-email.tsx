import axios from 'axios';
import { noop } from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { useFormSubmitModal } from '@/hooks';

import { endpoints } from '../endpoints';
import { SendEmailParams } from '../types';

type UseSendEmailParams = {
    place: string;
    files?: File[];
    onFinish?: () => void;
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

export const useSendEmail = ({ place, files = [], onFinish = noop }: UseSendEmailParams) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const formSubmitModal = useFormSubmitModal();

    const handleSendEmail = useCallback(
        async (values: Omit<SendEmailParams, 'place' | 'files'>) => {
            const utm = localStorage.getItem('utm');

            setLoading(true);

            await sendEmail({
                ...values,
                files,
                place,
                meta: {
                    ...values.meta,
                    URL: router.pathname,
                    ...(utm ? JSON.parse(utm) : {}),
                },
            });

            setLoading(false);
            formSubmitModal.onOpen();
            onFinish();
        },
        [router, place, files, formSubmitModal, onFinish]
    );

    return {
        loading,
        onSendEmail: handleSendEmail,
    };
};
