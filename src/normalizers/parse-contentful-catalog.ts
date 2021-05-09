import { SectionCollection, Collection } from '@/entities';
import { ApolloQueryResult } from '@apollo/client';
import { CatalogResponse } from '@/utils/api/types';

const checkIfTypenameisASection = (data: SectionCollection | Collection): data is SectionCollection => {
    const { __typename } = data;

    return (
        __typename === 'AccessoriesSectionCollection'
        || __typename === 'CupboardSectionCollection'
        || __typename === 'WardrobeSectionCollection'
        || __typename === 'LightingSystemsSectionCollection'
    );
}

/**
 * Достает из объекта ответа полученного из contentful CMS массив карточек по заданному фильтру
 * @param response ответ от contentful CMS
 * @param filter текущий фильтр
 * @returns массив карточек
 */
export const parseContentfulCatalog = (
    response: ApolloQueryResult<CatalogResponse>,
): SectionCollection | Collection => {
    const res = response.data.result;

    console.log(JSON.stringify(response, undefined, 4));

    if (checkIfTypenameisASection(res)) {
        return res.items[0].cardsCollection;
    }

    return res;
};
