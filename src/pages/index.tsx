import { makeStyles } from '@material-ui/core/styles';
import React, { FC } from 'react';

import {
    About,
    Advantages,
    CallDesigner,
    CallDesignerForm,
    Carousel,
    Catalog,
    Description,
    DesignOffer,
    FAQ,
    FeedbackForm,
    HowToOrder,
    Map,
    OurProduction,
    QuestionsForm,
    ShopImg,
    WardrobeLeft,
    WardrobeRight,
} from '@/components';
import { useTrackUtm } from '@/hooks';

const marginTop80 = {
    marginTop: '80px',
};

const marginTop40 = {
    marginTop: '40px',
};

const useStyles = makeStyles((theme) => ({
    carousel: {},
    description: {
        marginTop: '65px',
    },
    catalog: marginTop80,
    designOffer: marginTop80,
    feedbackForm: marginTop80,
    advantages: marginTop80,
    wardrobeLeft: marginTop80,
    wardrobeRight: marginTop80,
    about: marginTop80,
    callDesigner: marginTop80,
    callDesignerForm: marginTop80,
    ourProduction: marginTop80,
    howToOrder: marginTop80,
    faq: marginTop80,
    questionsForm: marginTop80,
    shopImg: marginTop40,
    contacts: marginTop80,
    [theme.breakpoints.down('xs')]: {
        description: marginTop40,
        catalog: marginTop40,
        designOffer: marginTop40,
        feedbackForm: marginTop40,
        advantages: marginTop40,
        wardrobeLeft: marginTop40,
        wardrobeRight: marginTop40,
        about: marginTop40,
        callDesigner: marginTop40,
        callDesignerForm: marginTop40,
        ourProduction: marginTop40,
        howToOrder: marginTop40,
        faq: marginTop40,
        questionsForm: marginTop40,
        shopImg: marginTop40,
        contacts: marginTop40,
    },
}));

const HomePage: FC = () => {
    useTrackUtm();
    const classes = useStyles();

    return (
        <>
            <main>
                <section id="carousel" className={classes.carousel}>
                    <Carousel />
                </section>

                {/* Текст под каруселью */}
                <section className={classes.description}>
                    <Description />
                </section>

                {/* Ссылки на каталог */}
                <section id="catalog" className={classes.catalog}>
                    <Catalog />
                </section>

                {/* Получите дизайн-проект и стомость вашего проекта сегодня */}
                <section id="design-offer" className={classes.designOffer}>
                    <DesignOffer />
                </section>

                {/* Форма рассчёта стоимости с прикладыванием файла */}
                <section className={classes.feedbackForm}>
                    <FeedbackForm />
                </section>

                {/* Преимущества нашей продукции */}
                <section
                    id="advantages"
                    // ref={(el) => { refsMap.current['#advantages'] = el; }}
                    className={classes.advantages}
                >
                    <Advantages />
                </section>

                {/* Комфорт и удобство, продуманное до мелочей */}
                <section id="comfort" className={classes.wardrobeLeft}>
                    <WardrobeLeft />
                </section>

                {/* Исключтельное качество нашей мебели */}
                <section id="quality" className={classes.wardrobeRight}>
                    <WardrobeRight />
                </section>

                {/* О нас */}
                <section id="about" className={classes.about}>
                    <About />
                </section>

                {/* Закажите выезд дизайнера-замерщика сегодня
          и получите проект мебели в течение 24 часов */}
                <section id="call-designer" className={classes.callDesigner}>
                    <CallDesigner />
                </section>

                {/* Форма вызова дизайнера-замерщика */}
                <section className={classes.callDesignerForm}>
                    <CallDesignerForm />
                </section>

                {/* Наше производство */}
                <section id="production" className={classes.ourProduction}>
                    <OurProduction />
                </section>

                {/* Как заказать нашу мебель */}
                <section id="how-to-order" className={classes.howToOrder}>
                    <HowToOrder />
                </section>

                {/* Часто задаваемые вопросы */}
                <section id="faq" className={classes.faq}>
                    <FAQ />
                </section>

                {/* Форма "Остались вопросы?" */}
                <section id="questions" className={classes.questionsForm}>
                    <QuestionsForm />
                </section>

                {/* Изображение магазина */}
                <section id="shop-img" className={classes.shopImg}>
                    <ShopImg />
                </section>

                {/* Магазин на карте */}
                <section id="contacts" className={classes.contacts}>
                    <Map />
                </section>
            </main>
        </>
    );
};

export default HomePage;
