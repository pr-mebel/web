import { addIdsToArrayOfObjects } from '@/utils';

export const PAGES = addIdsToArrayOfObjects([
  {
    titles: addIdsToArrayOfObjects(['Частный мебельер']),
    subtitles: [],
    texts: addIdsToArrayOfObjects([
      'Шоу-рум мебели премиум класса',
      'по индивидуальным дизайн-проектам',
    ]),
    to: '/catalog',
  },
  {
    titles: addIdsToArrayOfObjects(['Элегантная классика']),
    subtitles: addIdsToArrayOfObjects(['в лучших традициях', 'качества']),
    texts: addIdsToArrayOfObjects([
      'Премиальные материалы',
      'Изысканный дизайн',
    ]),
    to: '/catalog?section=cupboard&style=classic',
  },
  {
    titles: addIdsToArrayOfObjects(['Гардеробные', 'системы']),
    subtitles: [],
    texts: addIdsToArrayOfObjects([
      'Индивидуальное проектирование',
      'любой сложности',
      'Мы можем то, что другим не под силу',
    ]),
    to: '/catalog?section=wardrobe',
  },
  {
    titles: addIdsToArrayOfObjects(['Дизайнерская мебель', 'в стиле модерн']),
    subtitles: [],
    texts: addIdsToArrayOfObjects([
      'Совершенный стиль',
      'Безупречное качество',
    ]),
    to: '/catalog?section=cupboard&style=modern',
  },
  {
    titles: addIdsToArrayOfObjects(['Комфорт, продуманный', 'до мелочей']),
    subtitles: [],
    texts: addIdsToArrayOfObjects([
      'Эксклюзивные решения',
      'для организации хранения',
    ]),
    to: '/catalog?section=accessories',
  },
  {
    titles: addIdsToArrayOfObjects(['Истинное качество', 'в деталях']),
    subtitles: [],
    texts: addIdsToArrayOfObjects([
      'Современные мебельные технологии,',
      'материалы и комплектующие',
    ]),
    to: '/catalog?section=lightingSystems',
  },
]);
