import axios from 'axios';
import { Item } from '@/entities';
import {
    FetchCatalogByFilterParams,
    FetchFAQRespone,
    SendEmailParams,
} from './types';
import { client } from '../client';
import { gql } from '@apollo/client';

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
    axios.post('/api/catalog', {
        filters,
        page,
    });

export const sendEmail = (params: SendEmailParams): Promise<void> =>
    axios.post('/api/send-email', params);

const FAQEntityID = '50kulGjR4KrEMHAomWqIgM';

export const fetchFAQ = (): Promise<FetchFAQRespone> =>
    client.query({
        query: gql`
        {
            faqList(id: "${FAQEntityID}") {
                itemsCollection {
                    items {
                        title
                        text
                    }
                }
            }
        }
        `,
    });
