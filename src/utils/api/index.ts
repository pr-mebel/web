import axios from 'axios';
import { Item } from '@/entities';
import { FetchCatalogByFilterParams, SendEmailParams } from './types';

/**
 * Запрашивает из contentful CMS карточки по текущему фильтру
 * @param param0 Параметры фильтров
 * @param page Текущая страница в каталоге
 * @returns Объект с новыми карточками
 */
export const fetchCatalogByFilter = (
    filters: FetchCatalogByFilterParams,
    page: number,
): Promise<{
    data: {
        items: Item[];
        total: number;
    }
}> =>
    axios.post('/api/catalog', {
        filters,
        page,
    });

export const sendEmail = (
    params: SendEmailParams,
): Promise<void> =>
    axios.post('/api/send-email', params);
