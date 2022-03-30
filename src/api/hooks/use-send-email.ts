import axios from 'axios';
import { noop } from 'lodash';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';

import { useFormSubmitModal } from '@/hooks';

import { endpoints } from '../endpoints';
import { SendEmailParams } from '../types';

type UseSendEmailParams = {
    place: string;
    files?: File[];
    onFinish?: () => void;
};

const prepareData = ({ name, tel, description, email, files, place, meta = {} }: SendEmailParams) => {
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

    return formData;
};

export const useSendEmail = ({ place, files = [], onFinish = noop }: UseSendEmailParams) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const formSubmitModal = useFormSubmitModal();

    const handleSendEmail = useCallback(
        async (values: Omit<SendEmailParams, 'place' | 'files'>) => {
            const utm = localStorage.getItem('utm');

            setLoading(true);

            const formData = prepareData({
                ...values,
                files,
                place,
                meta: {
                    ...values.meta,
                    URL: router.pathname,
                    ...(utm ? JSON.parse(utm) : {}),
                },
            });

            try {
                await axios.post(endpoints.logRequestToDB, {
                    ...values,
                    place,
                    meta: {
                        ...values.meta,
                        URL: router.pathname,
                        ...(utm ? JSON.parse(utm) : {}),
                    },
                });
            } catch {}

            try {
                await axios.post(endpoints.sendRequestEmail, formData, {
                    headers: { 'content-type': 'multipart/form-data' },
                });

                formSubmitModal.onOpen();
                onFinish();
            } catch (error) {
                enqueueSnackbar('Не удалось отправить заявку. Напишите нам на почту напрямую, либо попробуйте позже', {
                    variant: 'error',
                });
            }

            setLoading(false);
        },
        [files, place, router.pathname, formSubmitModal, onFinish, enqueueSnackbar]
    );

    return {
        loading,
        onSendEmail: handleSendEmail,
    };
};
