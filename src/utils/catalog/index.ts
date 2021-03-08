import { FilterKeyValue, FilterField, SectionId, StyleId, DoorTypeId } from '@/entities';

/**
 * TypeGuard, который проверяет, что распаршенная пара ключ значение из URlSearchParams являются
 * возможным полем и значением фильтра
 * @param pair ключ-значние из URLSearchParams
 * @returns boolean
 */
export const checkIfNameAndValueAreKnown = (
    pair: { name: string; value: string }
): pair is FilterKeyValue => {
    const { name, value } = pair;
    if (typeof value !== 'string') {
        return false;
    }

    return (
        name === FilterField.section && value in SectionId ||
        name === FilterField.style && value in StyleId ||
        name === FilterField.doorType && value in DoorTypeId
    )
}