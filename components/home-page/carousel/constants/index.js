import { addIdsToArrayOfObjects } from 'lib/utils';

const topImg1 = 'images/home-page/carousel/top-img1.jpg';
const topImg2 = 'images/home-page/carousel/top-img2.jpg';
const topImg3 = 'images/home-page/carousel/top-img3.jpg';
const topImg4 = 'images/home-page/carousel/top-img4.jpg';
const topImg5 = 'images/home-page/carousel/top-img5.jpg';
const topImg6 = 'images/home-page/carousel/top-img6.jpg';

const topImgTab1 = 'images/home-page/carousel/top-img-tab1.jpg';
const topImgTab2 = 'images/home-page/carousel/top-img-tab2.jpg';
const topImgTab3 = 'images/home-page/carousel/top-img-tab3.jpg';
const topImgTab4 = 'images/home-page/carousel/top-img-tab4.jpg';
const topImgTab5 = 'images/home-page/carousel/top-img-tab5.jpg';
const topImgTab6 = 'images/home-page/carousel/top-img-tab6.jpg';

const topImgMob1 = 'images/home-page/carousel/top-img-mob1.jpg';
const topImgMob2 = 'images/home-page/carousel/top-img-mob2.jpg';
const topImgMob3 = 'images/home-page/carousel/top-img-mob3.jpg';
const topImgMob4 = 'images/home-page/carousel/top-img-mob4.jpg';
const topImgMob5 = 'images/home-page/carousel/top-img-mob5.jpg';
const topImgMob6 = 'images/home-page/carousel/top-img-mob6.jpg';

export const PAGES = addIdsToArrayOfObjects([
  {
    titles: addIdsToArrayOfObjects([
      'Частный мебельер',
    ]),
    subtitles: [],
    texts: addIdsToArrayOfObjects([
      'Шоу-рум мебели премиум класса',
      'по индивидуальным дизайн-проектам',
    ]),
    imageSet: {
      small: topImgMob1,
      medium: topImgTab1,
      large: topImg1,
    },
    to: '/catalog',
  },
  {
    titles: addIdsToArrayOfObjects([
      'Элегантная классика',
    ]),
    subtitles: addIdsToArrayOfObjects([
      'в лучших традициях',
      'качества',
    ]),
    texts: addIdsToArrayOfObjects([
      'Премиальные детали',
      'Изысканный дизайн',
    ]),
    imageSet: {
      small: topImgMob2,
      medium: topImgTab2,
      large: topImg2,
    },
    to: '/catalog?section=cupboard&style=classic',
  },
  {
    titles: addIdsToArrayOfObjects([
      'Гардеробные',
      'системы',
    ]),
    subtitles: [],
    texts: addIdsToArrayOfObjects([
      'Индивидуальное проектирование',
      'любой сложности',
      'Мы можем то, что другим не под силу',
    ]),
    imageSet: {
      small: topImgMob3,
      medium: topImgTab3,
      large: topImg3,
    },
    to: '/catalog?section=wardrobe',
  },
  {
    titles: addIdsToArrayOfObjects([
      'Дизайнерская мебель',
      'в стиле модерн',
    ]),
    subtitles: [],
    texts: addIdsToArrayOfObjects([
      'Совершенный стиль',
      'Безупречное качество',
    ]),
    imageSet: {
      small: topImgMob4,
      medium: topImgTab4,
      large: topImg4,
    },
    to: '/catalog?section=cupboard&style=modern',
  },
  {
    titles: addIdsToArrayOfObjects([
      'Комфорт, продуманный',
      'до мелочей',
    ]),
    subtitles: [],
    texts: addIdsToArrayOfObjects([
      'Эксклюзивные решения',
      'для организации хранения',
    ]),
    imageSet: {
      small: topImgMob5,
      medium: topImgTab5,
      large: topImg5,
    },
    to: '/catalog?section=accessories',
  },
  {
    titles: addIdsToArrayOfObjects([
      'Истинное качество',
      'в деталях',
    ]),
    subtitles: [],
    texts: addIdsToArrayOfObjects([
      'Современные мебельные технологии,',
      'материалы и комплектующие',
    ]),
    imageSet: {
      small: topImgMob6,
      medium: topImgTab6,
      large: topImg6,
    },
    to: '/catalog?section=lightingSystems',
  },
]);
