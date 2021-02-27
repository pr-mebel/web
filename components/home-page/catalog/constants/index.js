import { addIdsToArrayOfObjects } from 'lib/utils';

const img1 = '/images/home-page/catalog/1.jpg';
const img2 = '/images/home-page/catalog/2.jpg';
const img3 = '/images/home-page/catalog/3.jpg';
const img4 = '/images/home-page/catalog/4.jpg';
const img5 = '/images/home-page/catalog/5.jpg';
const img6 = '/images/home-page/catalog/6.jpg';

export const CATALOG = addIdsToArrayOfObjects([
    {
        title: 'Традиции и элегантность',
        subtitle: 'В вашем интерьере',
        caption: 'Шкафы классические',
        img: img1,
        href: '/catalog?section=cupboard&style=classic',
    },
    {
        title: 'Безупречный стиль',
        subtitle: 'В современном исполнении',
        caption: 'Шкафы современные',
        img: img2,
        href: '/catalog?section=cupboard&style=modern',
    },
    {
        title: 'Продуманные решения',
        subtitle: 'Для удобного хранения',
        caption: 'Аксессуары',
        img: img3,
        href: '/catalog?section=accessories',
    },
    {
        title: 'Элегантные формы',
        subtitle: 'Для функциональных пространств',
        caption: 'Гардеробные классические',
        img: img4,
        href: '/catalog?section=wardrobe&style=classic',
    },
    {
        title: 'Совершенный дизайн',
        subtitle: 'Максимальная функциональность',
        caption: 'Гардеробные современные',
        img: img5,
        href: '/catalog?section=wardrobe&style=modern',
    },
    {
        title: 'Истинный комфорт',
        subtitle: 'В каждой детали',
        caption: 'Системы подсветки',
        img: img6,
        href: '/catalog?section=lightingSystems',
    },
]);
