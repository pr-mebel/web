import { NB_SP, MDASH } from '__constants__';
import { addIdsToArrayOfObjects } from 'lib/utils';

const imgAdd1 = '/images/home-page/wardrobe-right/1.jpg';
const imgAdd2 = '/images/home-page/wardrobe-right/2.jpg';
const imgAdd3 = '/images/home-page/wardrobe-right/3.jpg';
const imgAdd4 = '/images/home-page/wardrobe-right/4.jpg';
const imgAdd5 = '/images/home-page/wardrobe-right/5.jpg';
const imgAdd6 = '/images/home-page/wardrobe-right/6.jpg';
const imgAdd7 = '/images/home-page/wardrobe-right/7.jpg';
const imgAdd8 = '/images/home-page/wardrobe-right/8.jpg';
const imgAdd9 = '/images/home-page/wardrobe-right/9.jpg';
const imgAdd10 = '/images/home-page/wardrobe-right/10.jpg';
const imgAdd11 = '/images/home-page/wardrobe-right/11.jpg';

export const defaultImage = '/images/home-page/wardrobe-right/wardrobe-1.jpg';

export const ADDITIONAL = addIdsToArrayOfObjects([
    // 1
    {
        title: 'Двери купе',
        text: `Идеальный внешний вид, бесшумное скольжение, возможность сделать
    широкие двери шириной до${NB_SP}1800${NB_SP}мм и${NB_SP}весом до${NB_SP}60${NB_SP}кг.
    Итальянская система Cinetto.`,
        img: imgAdd1,
        top: '4%',
        left: '14%',
        direction: 'right',
    },
    // 2
    {
        title: 'Выравнивающие устройства',
        text: `Для того, чтобы двери служили лучше и${NB_SP}дольше мы${NB_SP}применяем
    специальные выравнивающие устройства.`,
        img: imgAdd2,
        top: '57%',
        left: '14%',
        direction: 'right',
    },
    // 3
    {
        title: 'Комфортное использование ящиков',
        text: `Ящики открываются на${NB_SP}100% и${NB_SP}имеют специальные механизмы
    плавного закрывания. Гарантия на${NB_SP}выдвижные механизмы 25${NB_SP}лет.`,
        img: imgAdd3,
        top: '63%',
        left: '33%',
        direction: 'right',
    },
    // 4
    {
        title: `Складные двери${NB_SP}${MDASH} гармошка`,
        text: `Хотите, чтобы все двери были расположены без перепадов в${NB_SP}одной
    плоскости, и${NB_SP}что${NB_SP}бы можно было иметь удобный доступ к${NB_SP}внутреннему
    пространству шкафа? Выбирайте складные двери${NB_SP}${MDASH} гармошка.`,
        img: imgAdd4,
        top: '35%',
        left: '46%',
        direction: 'right',
    },
    // 5
    {
        title: 'Специальная задняя стенка',
        text: `Задняя стенка имеет толщину 8${NB_SP}мм и${NB_SP}устанавливается
    в${NB_SP}специальный паз. Это обеспечивает повышенную жесткость конструкции,
    и${NB_SP}позволяет не${NB_SP}перемещать изделие при монтаже, сохраняя паркет
    и${NB_SP}стены помещения.`,
        img: imgAdd5,
        top: '69%',
        left: '56%',
        direction: 'left',
    },
    // 6
    {
        title: 'Безопасный крепеж для полок',
        text: `Чтобы пользоваться изделием было удобно и${NB_SP}безопасно
    мы${NB_SP}применяем специальные полкодержатели с${NB_SP}механизмом фиксации`,
        img: imgAdd6,
        top: '19%',
        left: '63%',
        direction: 'left',
    },
    // 7
    {
        title: 'Регулируемые опоры',
        text: `Для правильного расположения изделия в${NB_SP}пространстве
    мы${NB_SP}применяем специальные выравнивающие устройства. Это позволяет
    выставить изделие идеально ровно, что продлевает срок его службы.`,
        img: imgAdd7,
        top: '91%',
        left: '63%',
        direction: 'left',
    },
    // 8
    {
        title: 'Противоударная кромка 2 мм',
        text: `Мы${NB_SP}применяем специальную европейскую кромку толщиной 2${NB_SP}мм,
    которая идеально подходит к${NB_SP}цвету материала и${NB_SP}надежно защищает
    изделие в${NB_SP}процессе эксплуатации. Она не${NB_SP}трескается,
    не${NB_SP}скалывается и${NB_SP}не${NB_SP}отклеивается в${NB_SP}процессе эксплуатации.
    НЕ${NB_SP}КИТАЙ!`,
        img: imgAdd8,
        top: '1%',
        left: '97%',
        direction: 'left',
    },
    // 9
    {
        title: `Петли BLUM с${NB_SP}механизмом доводки`,
        text: `Мы${NB_SP}применяем новейшие петли со${NB_SP}встроенным механизмом плавного
    закрывания. Петли выглядят изящно, и${NB_SP}при этом..`,
        img: imgAdd9,
        top: '27%',
        left: '90%',
        direction: 'left',
    },
    // 10
    {
        title: 'Отверстия только там, где необходимо',
        text: `Все изделия делаются полностью индивидуально.
    Отверстия будут только там, где это необходимо.`,
        img: imgAdd10,
        top: '52%',
        left: '89%',
        direction: 'left',
    },
    // 11
    {
        title: 'Безопасные выдвижные ящики',
        text: `Конструкция ящика имеет усиленное дно 8${NB_SP}мм, которое обезопасит
    ваши вещи от${NB_SP}зацепов и${NB_SP}не${NB_SP}вывалится в${NB_SP}процессе эксплуатации.`,
        img: imgAdd11,
        top: '63%',
        left: '85%',
        direction: 'left',
    },
]);
