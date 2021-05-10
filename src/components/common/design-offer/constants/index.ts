import { FC } from 'react';
import { addIdsToArrayOfObjects } from '@/utils';
import { NB_SP } from '@/constants';
import Img1 from '../assets/design-img.svg';
import Img2 from '../assets/design-img2.svg';
import Img3 from '../assets/design-img3.svg';
import Img4 from '../assets/design-img4.svg';

type Img = FC<{ className: string }>;

export const LIST = addIdsToArrayOfObjects([
    {
        title: `Пришлите нам эскизы вашей мебели или просто оставьте свои
    контактные данные`,
        img: Img1 as Img,
    },
    {
        title: `При необходимости, мы${NB_SP}уточним детали и${NB_SP}бесплатно
    разработаем проект в${NB_SP}ЗД`,
        img: Img2 as Img,
    },
    {
        title: 'Предложим разные варианты наполнение шкафа или гардеробной',
        img: Img3 as Img,
    },
    {
        title: 'Сформируем лучшее предложение в рамках бюджета',
        img: Img4 as Img,
    },
]);
