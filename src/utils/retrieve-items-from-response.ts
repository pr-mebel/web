import { Filter, StyleId, DoorTypeId } from '@/entities';
import { ApolloQueryResult } from '@apollo/client';
import { FetchCatalogByFilterResponse } from './api/types';

export const retrieveItemsFromResponse = (
    response: ApolloQueryResult<FetchCatalogByFilterResponse>,
    filter: Filter,
) => {
    if (filter.style === StyleId.any && filter.doorType === DoorTypeId.any) {
        return Object.values(response.data)[0].items[0].cardsCollection;
    }

    return Object.values(response.data)[0];
};
