import { Item, FilterKeyValue, StyleId, SectionId, DoorTypeId } from '@/entities';

export type ChangeFilterPayload = {
    payload: FilterKeyValue;
};

export type FetchCatalogFulfilledPayload = {
    payload: {
        items: Item[];
        total: number;
    }
}

export type OpenFullScreenPopupPayload = {
    payload: number;
}

type ValueType = StyleId | SectionId | DoorTypeId

export const valueIsStyle = (value: ValueType): value is StyleId => (
    value in StyleId
);

export const valueIsDoorType = (value: ValueType): value is DoorTypeId => (
    value in DoorTypeId
);
