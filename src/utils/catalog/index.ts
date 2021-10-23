import { FilterKeyValue, FilterField, sectionIDs, SectionID, styleIDs, StyleID, doorTypeIDs, DoorTypeID } from '@/entities';

/**
 * TypeGuard, который проверяет, что распаршенная пара ключ значение из URlSearchParams являются
 * возможным полем и значением фильтра
 * @param pair ключ-значние из URLSearchParams
 * @returns boolean
 */
export const checkIfNameAndValueAreKnown = (
    pair: { name: string; value: string },
): pair is FilterKeyValue => {
    const { name, value } = pair;
    if (typeof value !== 'string') {
        return false;
    }

    return (
        name === 'section' as FilterField && sectionIDs.includes(value as SectionID) ||
        name === 'style' as FilterField && styleIDs.includes(value as StyleID) ||
        name === 'doorType' as FilterField && doorTypeIDs.includes(value as DoorTypeID)
    );
};
