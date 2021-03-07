import { ContentModelSectionId, SectionCollection, Collection } from '@/entities';
import { ApolloQueryResult } from '@apollo/client';
import { CatalogResponse } from '@/utils/api/types';

const checkIfTypenameisASection = (data: SectionCollection | Collection): data is SectionCollection =>
    Object.values(ContentModelSectionId).includes(data.__typename as ContentModelSectionId)

/**
 * Достает из объекта ответа полученного из contentful CMS массив карточек по заданному фильтру
 * @param response ответ от contentful CMS
 * @param filter текущий фильтр
 * @returns массив карточек
 */
export const parseContentfulCatalog = (
    response: ApolloQueryResult<CatalogResponse>,
) => {
    const res = Object.values(response.data)[0];

    if (checkIfTypenameisASection(res)) {
        return res.items[0].cardsCollection;
    }

    return res;
};
