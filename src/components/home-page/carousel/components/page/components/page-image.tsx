import { Hidden } from '@material-ui/core';
import Image from 'next/image';
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
import React, { FC } from 'react';

type Props = {
    pageID: number;
};

export const PageImage: FC<Props> = ({ pageID }) => {
    switch (pageID) {
        case 0:
            return (
                <>
                    <Hidden smDown>
                        <Image src={topImg1} alt="Частный мебельер" layout="fill" placeholder="blur" />
                    </Hidden>
                    <Hidden xsDown mdUp>
                        <Image src={topImgTab1} alt="Частный мебельер" layout="fill" placeholder="blur" />
                    </Hidden>
                    <Hidden smUp>
                        <Image src={topImgMob1} alt="Частный мебельер" layout="fill" placeholder="blur" quality={90} />
                    </Hidden>
                </>
            );
        case 1:
            return (
                <>
                    <Hidden smDown>
                        <Image src={topImg2} alt="Элегантная классика" layout="fill" placeholder="blur" />
                    </Hidden>
                    <Hidden xsDown mdUp>
                        <Image src={topImgTab2} alt="Элегантная классика" layout="fill" placeholder="blur" />
                    </Hidden>
                    <Hidden smUp>
                        <Image
                            src={topImgMob2}
                            alt="Элегантная классика"
                            layout="fill"
                            placeholder="blur"
                            quality={90}
                        />
                    </Hidden>
                </>
            );
        case 2:
            return (
                <>
                    <Hidden smDown>
                        <Image src={topImg3} alt="Гардеробные" layout="fill" placeholder="blur" />
                    </Hidden>
                    <Hidden xsDown mdUp>
                        <Image src={topImgTab3} alt="Гардеробные" layout="fill" placeholder="blur" />
                    </Hidden>
                    <Hidden smUp>
                        <Image src={topImgMob3} alt="Гардеробные" layout="fill" placeholder="blur" quality={90} />
                    </Hidden>
                </>
            );
        case 3:
            return (
                <>
                    <Hidden smDown>
                        <Image src={topImg4} alt="Дизайнерская мебель" layout="fill" placeholder="blur" />
                    </Hidden>
                    <Hidden xsDown mdUp>
                        <Image src={topImgTab4} alt="Дизайнерская мебель" layout="fill" placeholder="blur" />
                    </Hidden>
                    <Hidden smUp>
                        <Image
                            src={topImgMob4}
                            alt="Дизайнерская мебель"
                            layout="fill"
                            placeholder="blur"
                            quality={90}
                        />
                    </Hidden>
                </>
            );
        case 4:
            return (
                <>
                    <Hidden smDown>
                        <Image src={topImg5} alt="Комфорт, продуманный до мелочей" layout="fill" placeholder="blur" />
                    </Hidden>
                    <Hidden xsDown mdUp>
                        <Image
                            src={topImgTab5}
                            alt="Комфорт, продуманный до мелочей"
                            layout="fill"
                            placeholder="blur"
                        />
                    </Hidden>
                    <Hidden smUp>
                        <Image
                            src={topImgMob5}
                            alt="Комфорт, продуманный до мелочей"
                            layout="fill"
                            placeholder="blur"
                            quality={90}
                        />
                    </Hidden>
                </>
            );
        case 5:
            return (
                <>
                    <Hidden smDown>
                        <Image src={topImg6} alt="Истинное качество" layout="fill" placeholder="blur" />
                    </Hidden>
                    <Hidden xsDown mdUp>
                        <Image src={topImgTab6} alt="Истинное качество" layout="fill" placeholder="blur" />
                    </Hidden>
                    <Hidden smUp>
                        <Image src={topImgMob6} alt="Истинное качество" layout="fill" placeholder="blur" quality={90} />
                    </Hidden>
                </>
            );
        default:
            return null;
    }
};
