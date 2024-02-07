import { track } from '@vercel/analytics';
import axios from 'axios';
import { differenceInMilliseconds } from 'date-fns';
import { noop } from 'lodash';
import ms from 'ms';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { v4 } from 'uuid';

import { useYaCounter54949111 } from '@/analytics';
import {
    FormId,
    formIdToRoistatEventNameMapping,
    sessionStoragePageOpenTimestampKey,
} from '@/constants';
import { useInquiryForm } from '@/context/inquiry-form';
import { isProduction } from '@/utils';

import { endpoints } from '../endpoints';
import { SendEmailParams } from '../types';

type UseSendEmailParams = {
    place: FormId;
    files?: File[];
    onFinish?: () => void;
};

const prepareData = ({
    name,
    tel,
    description,
    email,
    files,
    place,
    meta = {},
}: SendEmailParams) => {
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
    const { successModal } = useInquiryForm();
    const yaCounter54949111 = useYaCounter54949111();

    const trackSubmit = useCallback(() => {
        if (!isProduction()) return;
        yaCounter54949111.track('inquiry-form/submit');

        window.yaCounter86537628?.reachGoal('forms');
        window.yaCounter86537628?.reachGoal('conversion');

        window.ga?.('send', 'event', 'form', 'forms');
        window.ga?.('send', 'event', 'forms');
        window.ga?.('send', 'event', 'form', 'submit');

        window.fbq?.('track', 'Lead');

        window._tmr.push({ type: 'reachGoal', id: 3241411, goal: 'lid' });

        window.VK.Goal('conversion');
    }, [yaCounter54949111]);

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
                meta['Проведено время на сайте'] = ms(
                    differenceInMilliseconds(new Date(), Number(timeSpent)),
                    {
                        long: true,
                    }
                );
            }

            const formData = prepareData({
                ...values,
                files,
                place,
                meta,
            });

            try {
                const requestId = v4();

                track('form-submitted', { formData: JSON.stringify(formData), requestId });

                await axios.post(endpoints.sendRequestEmail, formData, {
                    headers: { 'content-type': 'multipart/form-data' },
                });

                track('form-submitted-successfully', {
                    formData: JSON.stringify(formData),
                    requestId,
                });

                successModal.handleOpen();
                onFinish();
                trackSubmit();
            } catch (error) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const errorMessage = (error as any)?.message;

                track('form-submitted-failed', {
                    formData: JSON.stringify(formData),
                    error: errorMessage || 'Unknown error',
                });

                enqueueSnackbar(
                    'Не удалось отправить заявку. Напишите нам на почту напрямую, либо попробуйте позже',
                    {
                        variant: 'error',
                    }
                );
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
            window.roistat?.event.send(formIdToRoistatEventNameMapping[place], {
                baseUrl: window.location.href.split('?')[0],
            });
            // Roistat End Event Sending
        },

        [router.pathname, files, place, successModal, onFinish, trackSubmit, enqueueSnackbar]
    );

    return {
        loading,
        onSendEmail: handleSendEmail,
    };
};
