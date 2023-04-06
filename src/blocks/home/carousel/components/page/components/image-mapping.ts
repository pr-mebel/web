import { StaticImageData } from 'next/legacy/image';
import topImgMob1 from 'public/images/home-page/carousel/top-img-mob1.jpg';
import topImgMob2 from 'public/images/home-page/carousel/top-img-mob2.jpg';
import topImgMob3 from 'public/images/home-page/carousel/top-img-mob3.jpg';
import topImgMob4 from 'public/images/home-page/carousel/top-img-mob4.jpg';
import topImgMob5 from 'public/images/home-page/carousel/top-img-mob5.jpg';
import topImgMob6 from 'public/images/home-page/carousel/top-img-mob6.jpg';
import topImgTab1 from 'public/images/home-page/carousel/top-img-tab1.jpg';
import topImgTab2 from 'public/images/home-page/carousel/top-img-tab2.jpg';
import topImgTab3 from 'public/images/home-page/carousel/top-img-tab3.jpg';
import topImgTab4 from 'public/images/home-page/carousel/top-img-tab4.jpg';
import topImgTab5 from 'public/images/home-page/carousel/top-img-tab5.jpg';
import topImgTab6 from 'public/images/home-page/carousel/top-img-tab6.jpg';
import topImg1 from 'public/images/home-page/carousel/top-img1.jpg';
import topImg2 from 'public/images/home-page/carousel/top-img2.jpg';
import topImg3 from 'public/images/home-page/carousel/top-img3.jpg';
import topImg4 from 'public/images/home-page/carousel/top-img4.jpg';
import topImg5 from 'public/images/home-page/carousel/top-img5.jpg';
import topImg6 from 'public/images/home-page/carousel/top-img6.jpg';

type ScreenType = 'mobile' | 'tablet' | 'desktop';

type Config = Record<
    ScreenType,
    {
        img: StaticImageData;
        quality?: number;
    }
> & {
    alt: string;
};

export const imageMapping: Config[] = [
    {
        mobile: {
            img: topImgMob1,
            quality: 90,
        },
        tablet: {
            img: topImgTab1,
        },
        desktop: {
            img: topImg1,
        },
        alt: 'Частный мебельер',
    },
    {
        mobile: {
            img: topImgMob2,
            quality: 90,
        },
        tablet: {
            img: topImgTab2,
        },
        desktop: {
            img: topImg2,
        },
        alt: 'Элегантная классика',
    },
    {
        mobile: {
            img: topImgMob3,
            quality: 90,
        },
        tablet: {
            img: topImgTab3,
        },
        desktop: {
            img: topImg3,
        },
        alt: 'Гардеробные',
    },
    {
        mobile: {
            img: topImgMob4,
            quality: 90,
        },
        tablet: {
            img: topImgTab4,
        },
        desktop: {
            img: topImg4,
        },
        alt: 'Дизайнерская мебель',
    },
    {
        mobile: {
            img: topImgMob5,
            quality: 90,
        },
        tablet: {
            img: topImgTab5,
        },
        desktop: {
            img: topImg5,
        },
        alt: 'Комфорт, продуманный до мелочей',
    },
    {
        mobile: {
            img: topImgMob6,
            quality: 90,
        },
        tablet: {
            img: topImgTab6,
        },
        desktop: {
            img: topImg6,
        },
        alt: 'Истинное качество',
    },
];
