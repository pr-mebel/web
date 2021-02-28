import { React } from '@ungap/global-this';
import { v4 } from 'uuid';

export const addIdsToArrayOfObjects = <T extends unknown>(array: T[]): { id: string; data: T }[] =>
    array.map((elem) => ({
        id: v4(),
        data: elem,
    }));
