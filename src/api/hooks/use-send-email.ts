import axios from 'axios';
import { differenceInMilliseconds } from 'date-fns';
import { noop } from 'lodash';
import ms from 'ms';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';

import { FormId, formIdToRoistatEventNameMapping, sessionStoragePageOpenTimestampKey } from '@/constants';
import { useModal } from '@/hooks';

import { endpoints } from '../endpoints';
import { SendEmailParams } from '../types';

type UseSendEmailParams = {
    place: FormId;
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
    const formSubmitModal = useModal();

    const handleSendEmail = useCallback(
        async (values: Omit<SendEmailParams, 'place' | 'files'>) => {
            const utm = localStorage.getItem('utm');

            setLoading(true);

            const meta = {
                ...values.meta,
                URL: router.pathname,
                ...(utm ? JSON.parse(utm) : {}),
            };

            const timeSpent = sessionStorage.getItem(sessionStoragePageOpenTimestampKey);

            if (timeSpent) {
                sessionStorage.removeItem(sessionStoragePageOpenTimestampKey);
                meta['Проведено время на сайте'] = ms(differenceInMilliseconds(new Date(), Number(timeSpent)), {
                    long: true,
                });
            }

            const formData = prepareData({
                ...values,
                files,
                place,
                meta,
            });

            try {
                await axios.post(endpoints.sendRequestEmail, formData, {
                    headers: { 'content-type': 'multipart/form-data' },
                });

                formSubmitModal.handleOpen();
                onFinish();
            } catch (error) {
                enqueueSnackbar('Не удалось отправить заявку. Напишите нам на почту напрямую, либо попробуйте позже', {
                    variant: 'error',
                });
            }

            setLoading(false);

            try {
                await axios.post(endpoints.logRequest, {
                    ...values,
                    place,
                    meta,
                });
            } catch {}

            // Roistat Start Event Sending
            const baseUrl = window.location.href.split('?')[0];
            window.roistat?.event.send(formIdToRoistatEventNameMapping[place], { baseUrl: baseUrl });
            // Roistat End Event Sending
        },

        [files, place, router.pathname, formSubmitModal, onFinish, enqueueSnackbar]
    );

    useEffect(() => {
        if (formSubmitModal.isOpen) {
            setTimeout(() => formSubmitModal.handleClose(), 5000);
        }
    }, [formSubmitModal]);

    return {
        loading,
        onSendEmail: handleSendEmail,
        formSubmitModal: {
            isOpen: formSubmitModal.isOpen,
            onClose: formSubmitModal.handleClose,
        },
    };
};
