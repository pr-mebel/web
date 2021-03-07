import { v4 } from 'uuid';

/**
 * Добавляет к массиву объектов уникальные id
 * @param array массив объектов
 * @returns массив, с объектами 
 */
export const addIdsToArrayOfObjects = <T extends unknown>(array: T[]): { id: string; data: T }[] =>
    array.map((elem) => ({
        id: v4(),
        data: elem,
    }));
