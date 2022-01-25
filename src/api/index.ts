import axios from 'axios';

import { Item } from '@/entities';

import { endpoints } from './endpoints';
import { FetchCatalogByFilterParams, FetchFAQRespone } from './types';

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

export const fetchFAQ = (): Promise<FetchFAQRespone> => axios.post(endpoints.getFaq);

export * from './hooks';
