import { MDASH, NB_SP } from '@/constants';
import { addIdsToArrayOfObjects } from '@/utils';

const imgAdd1 = '/images/home-page/wardrobe-left/1.jpg';
const imgAdd2 = '/images/home-page/wardrobe-left/2.jpg';
const imgAdd3 = '/images/home-page/wardrobe-left/3.jpg';
const imgAdd4 = '/images/home-page/wardrobe-left/4.jpg';
const imgAdd5 = '/images/home-page/wardrobe-left/5.jpg';
const imgAdd6 = '/images/home-page/wardrobe-left/6.jpg';
const imgAdd7 = '/images/home-page/wardrobe-left/7.jpg';
const imgAdd8 = '/images/home-page/wardrobe-left/8.jpg';
const imgAdd9 = '/images/home-page/wardrobe-left/9.jpg';
const imgAdd10 = '/images/home-page/wardrobe-left/10.jpg';
const imgAdd11 = '/images/home-page/wardrobe-left/11.jpg';

export const TABS = addIdsToArrayOfObjects([
  {
    title: 'Кобминированный с Alcantara',
  },
  {
    title: 'Комбинированный',
  },
  {
    title: 'Однотонный',
  },
]);

export const ADDITIONAL = addIdsToArrayOfObjects([
  // 1
  {
    title: `Встроенная подсветка с${NB_SP}датчиками включения`,
    text: `Встроенная подсветка это не${NB_SP}просто модное решение,
    она незаменима при пользовании мебелью в${NB_SP}темное время суток,
    или в${NB_SP}помещении с${NB_SP}недостаточной освещенностью.`,
    img: imgAdd1,
    left: '1%',
    top: '18%',
    direction: 'right',
  },
  // 2
  {
    title: `Вешало с${NB_SP}силиконовым демпфером`,
    text: `Специальный силиконовый демпфер, встроенный в${NB_SP}вешало,
    сделает пользование мебелью еще более комфортным.`,
    img: imgAdd2,
    left: '27%',
    top: '6%',
    direction: 'right',
  },
  // 3
  {
    title: 'Телескопический съемник',
    text: `В${NB_SP}случае, если шкаф достаточно высокий, мы${NB_SP}оснастим его
    специальным съемником. Вам не${NB_SP}придется использовать стул,
    чтобы снять одежду с${NB_SP}верхнего яруса.`,
    img: imgAdd3,
    left: '33.5%',
    top: '20%',
    direction: 'right',
  },
  // 4
  {
    title: 'Внутреннее зеркало',
    text: `Иногда зеркало некомфортно размещать на${NB_SP}фасаде шкафа.
    В${NB_SP}этом случае его удобно разместить внутри изделия.`,
    img: imgAdd4,
    left: '28%',
    top: '50%',
    direction: 'right',
  },
  // 5
  {
    title: 'Выдвижные обувницы',
    text: `Размещение обуви в${NB_SP}выдвижных обувницах позволяет сэкономить
    место и${NB_SP}сделать ее${NB_SP}хранение значительно более удобным.`,
    img: imgAdd5,
    left: '34%',
    top: '82%',
    direction: 'right',
  },
  // 6
  {
    title: 'Лифтовое вешало',
    text: `Лифтовое вешало при необходимости позволяет эффективно
    использовать верхний ярус изделия.`,
    img: imgAdd6,
    left: '55%',
    top: '6%',
    direction: 'right',
  },
  // 7
  {
    title: 'Выдвижная галстучница',
    text: `Галстук${NB_SP}${MDASH} незаменимая вещь в${NB_SP}гардеробе делового
    человека. Выдвижное вешало для галстуков это идеальный способ хранения.`,
    img: imgAdd7,
    left: '96%',
    top: '23%',
    direction: 'left',
  },
  // 8
  {
    title: 'Выдвижные брючницы',
    text: `Благодаря этим удобным приспособлениям ваши брюки
    никогда не${NB_SP}будут мяться.`,
    img: imgAdd8,
    left: '60%',
    top: '80%',
    direction: 'right',
  },
  // 9
  {
    title: 'Специальные органайзеры',
    text: `Специальный органайзер отделанный Alcantara или тканью позволит
    удобным образом организовать хранение дорогих вам вещей.`,
    img: imgAdd9,
    left: '69%',
    top: '64%',
    direction: 'left',
  },
  // 10
  {
    title: 'Полки со стеклянными бортиками',
    text: `Стеклянные бортики ящиков из${NB_SP}тонированного стекла делают
    мебель более изящной.`,
    img: imgAdd10,
    left: '80%',
    top: '70%',
    direction: 'left',
  },
  // 11
  {
    title: 'Специальные органайзеры',
    text: `Теперь вы${NB_SP}можете определить свое место для каждого предмета,
    будь${NB_SP}то ремни галстуки, или очки.`,
    img: imgAdd11,
    left: '94%',
    top: '65%',
    direction: 'left',
  },
]);
