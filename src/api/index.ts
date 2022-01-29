import axios from 'axios';

import { Item, SectionID } from '@/entities';

import { endpoints } from './endpoints';
import { FetchFAQRespone } from './types';

/**
 * Запрашивает из contentful CMS карточки по текущему фильтру
 * @param filters Параметры фильтров
 * @param page Текущая страница в каталоге
 * @returns Объект с новыми карточками
 */
export const fetchCatalogByFilter = (section: SectionID) =>
    axios.post<Item[]>(endpoints.getCaltalogByFilter, {
        section,
    });

export const fetchFAQ = (): Promise<FetchFAQRespone> => axios.post(endpoints.getFaq);

export * from './hooks';
