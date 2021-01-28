import { filters } from '__constants__';

const cupboard = 'images/catalog/lead/cupboard.jpg';
const wardrobe = 'images/catalog/lead/wardrobe.jpg';
const accessories = 'images/catalog/lead/accessories.jpg';

export const images = {
  [filters.sections[0].id]: cupboard,
  [filters.sections[1].id]: wardrobe,
  [filters.sections[2].id]: accessories,
  [filters.sections[3].id]: accessories,
};
