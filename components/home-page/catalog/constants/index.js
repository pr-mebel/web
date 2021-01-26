import img1 from '../assets/catalog-1.jpg';
import img2 from '../assets/catalog-2.jpg';
import img3 from '../assets/catalog-3.jpg';
import img4 from '../assets/catalog-4.jpg';
import img5 from '../assets/catalog-5.jpg';
import img6 from '../assets/catalog-6.jpg';

export const CATALOG = [
  {
    id: 1,
    title: 'Традиции и элегантность',
    subtitle: 'В вашем интерьере',
    caption: 'Шкафы классические',
    img: img1,
    href: '/catalog?section=cupboard&style=classic#filters',
  },
  {
    id: 2,
    title: 'Безупречный стиль',
    subtitle: 'В современном исполнении',
    caption: 'Шкафы современные',
    img: img2,
    href: '/catalog?section=cupboard&style=modern#filters',
  },
  {
    id: 3,
    title: 'Продуманные решения',
    subtitle: 'Для удобного хранения',
    caption: 'Аксессуары',
    img: img3,
    href: '/catalog?section=accessories#filters',
  },
  {
    id: 4,
    title: 'Элегантные формы',
    subtitle: 'Для функциональных пространств',
    caption: 'Гардеробные классические',
    img: img4,
    href: '/catalog?section=wardrobe&style=classic#filters',
  },
  {
    id: 5,
    title: 'Совершенный дизайн',
    subtitle: 'Максимальная функциональность',
    caption: 'Гардеробные современные',
    img: img5,
    href: '/catalog?section=wardrobe&style=modern#filters',
  },
  {
    id: 6,
    title: 'Истинный комфорт',
    subtitle: 'В каждой детали',
    caption: 'Системы подсветки',
    img: img6,
    href: '/catalog?section=lightingSystems#filters',
  },
];
