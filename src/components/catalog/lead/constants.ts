import { filters } from '@/constants';
import { addIdsToArrayOfObjects } from '@/utils';

export const images = addIdsToArrayOfObjects([
    {
        sectionId: filters.sections[0].id,
    },
    {
        sectionId: filters.sections[1].id,
    },
    {
        sectionId: filters.sections[2].id,
    },
    {
        sectionId: filters.sections[3].id,
    },
]);
