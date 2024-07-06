import axios from 'axios';

import { Item, SectionID } from '@/entities';

import { endpoints } from './endpoints';

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

export * from './hooks';
