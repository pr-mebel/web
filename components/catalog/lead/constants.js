import { filters } from '__constants__';
import { addIdsToArrayOfObjects } from 'lib/utils';

const cupboard = '/images/catalog/lead/cupboard.jpg';
const wardrobe = '/images/catalog/lead/wardrobe.jpg';
const accessories = '/images/catalog/lead/accessories.jpg';

export const images = addIdsToArrayOfObjects([
    {
        image: cupboard,
        sectionId: filters.sections[0].id,
    },
    {
        image: wardrobe,
        sectionId: filters.sections[1].id,
    },
    {
        image: accessories,
        sectionId: filters.sections[2].id,
    },
    {
        image: accessories,
        sectionId: filters.sections[3].id,
    },
]);
