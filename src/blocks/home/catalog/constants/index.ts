import { addIdsToArrayOfObjects } from '@/utils';

export const CATALOG = addIdsToArrayOfObjects([
    {
        title: 'Традиции и элегантность',
        subtitle: 'В вашем интерьере',
        caption: 'Шкафы классические',
        href: '/catalog?section=cupboard&style=classic',
    },
    {
        title: 'Безупречный стиль',
        subtitle: 'В современном исполнении',
        caption: 'Шкафы современные',
        href: '/catalog?section=cupboard&style=modern',
    },
    {
        title: 'Продуманные решения',
        subtitle: 'Для удобного хранения',
        caption: 'Аксессуары',
        href: '/catalog?section=accessories',
    },
    {
        title: 'Элегантные формы',
        subtitle: 'Для функциональных пространств',
        caption: 'Гардеробные классические',
        href: '/catalog?section=wardrobe&style=classic',
    },
    {
        title: 'Совершенный дизайн',
        subtitle: 'Максимальная функциональность',
        caption: 'Гардеробные современные',
        href: '/catalog?section=wardrobe&style=modern',
    },
    {
        title: 'Истинный комфорт',
        subtitle: 'В каждой детали',
        caption: 'Системы подсветки',
        href: '/catalog?section=lightingSystems',
    },
]);
