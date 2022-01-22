import axios from 'axios';

import { Item } from '@/entities';

import { endpoints } from './endpoints';
import { FetchCatalogByFilterParams, FetchFAQRespone, SendEmailParams } from './types';

/**
 * Запрашивает из contentful CMS карточки по текущему фильтру
 * @param filters Параметры фильтров
 * @param page Текущая страница в каталоге
 * @returns Объект с новыми карточками
 */
export const fetchCatalogByFilter = (
    filters: FetchCatalogByFilterParams,
    page: number
): Promise<{
    data: {
        items: Item[];
        total: number;
    };
}> =>
    axios.post(endpoints.getCaltalogByFilter, {
        filters,
        page,
    });

export const sendEmail = (params: SendEmailParams): Promise<void> => {
    const formData = new FormData();

    formData.append('name', params.name);
    formData.append('tel', params.tel);
    formData.append('email', params.email || '');
    formData.append('description', params.description || '');
    formData.append('meta', JSON.stringify(params.meta) || '');
    params.files?.forEach((file) => {
        formData.append('files', file);
    });

    return axios.post(endpoints.sendEmail, formData, {
        headers: { 'content-type': 'multipart/form-data' },
    });
};

export const fetchFAQ = (): Promise<FetchFAQRespone> => axios.post(endpoints.getFaq);
