import { v4 } from 'uuid';

export const addIdsToArrayOfObjects = (array) =>
    array.map((elem) => {
        if (typeof elem === 'object' && elem !== null) {
            return {
                id: v4(),
                ...elem,
            };
        }

        return {
            id: v4(),
            data: elem,
        };
    });
