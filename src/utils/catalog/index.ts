import {
  doorTypeIDs,
  FilterField,
  FilterKeyValue,
  sectionIDs,
  styleIDs,
} from '@/entities';

/**
 * TypeGuard, который проверяет, что распаршенная пара ключ значение из URlSearchParams являются
 * возможным полем и значением фильтра
 * @param pair ключ-значние из URLSearchParams
 * @returns boolean
 */
export const checkIfNameAndValueAreKnown = (pair: {
  name: string;
  value: string;
}): pair is FilterKeyValue => {
  const { name, value } = pair;
  if (typeof value !== 'string') {
    return false;
  }

  return (
    (name === ('section' as FilterField) &&
      sectionIDs.safeParse(value).success) ||
    (name === ('style' as FilterField) && styleIDs.safeParse(value).success) ||
    (name === ('doorType' as FilterField) &&
      doorTypeIDs.safeParse(value).success)
  );
};
