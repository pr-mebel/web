import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  DesignOffer,
  Carousel,
  Description,
  Catalog,
  FeedbackForm,
  Advantages,
  WardrobeLeft,
  WardrobeRight,
  About,
  CallDesigner,
  CallDesignerForm,
  OurProduction,
  HowToOrder,
  FAQ,
  QuestionsForm,
  ShopImg,
  Map,
} from 'components';

const marginTop80 = {
  marginTop: '80px',
};

const marginTop40 = {
  marginTop: '40px',
};

const useStyles = makeStyles((theme) => ({
  carousel: {

  },
  description: {
    marginTop: '65px',
  },
  catalog: marginTop80,
  designOffer: marginTop80,
  feedbackForm: marginTop80,
  advantages: marginTop80,
  wardrobe_left: marginTop80,
  wardrobe_right: marginTop80,
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
    wardrobe_left: marginTop40,
    wardrobe_right: marginTop40,
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

const HomePage = () => {
  const classes = useStyles();

  return (
    <>
      <main>
        <section
          // ref={(el) => { refsMap.current['#carousel'] = el; }}
          className={classes.carousel}
        >
          <Carousel />
        </section>

        {/* Текст под каруселью */}
        <section
          className={classes.description}
        >
          <Description />
        </section>

        {/* Ссылки на каталог */}
        <section
          // ref={(el) => { refsMap.current['#catalog'] = el; }}
          className={classes.catalog}
        >
          <Catalog />
        </section>

        {/* Получите дизайн-проект и стомость вашего проекта сегодня */}
        <section
          // ref={(el) => { refsMap.current['#design-offer'] = el; }}
          className={classes.designOffer}
        >
          <DesignOffer />
        </section>

        {/* Форма рассчёта стоимости с прикладыванием файла */}
        <section
          className={classes.feedbackForm}
        >
          <FeedbackForm />
        </section>

        {/* Преимущества нашей продукции */}
        <section
          // ref={(el) => { refsMap.current['#advantages'] = el; }}
          className={classes.advantages}
        >
          <Advantages />
        </section>

        {/* Комфорт и удобство, продуманное до мелочей */}
        <section
          // ref={(el) => { refsMap.current['#comfort'] = el; }}
          className={classes.wardrobe_left}
        >
          <WardrobeLeft />
        </section>

        {/* Исключтельное качество нашей мебели */}
        <section
          // ref={(el) => { refsMap.current['#quality'] = el; }}
          className={classes.wardrobe_right}
        >
          <WardrobeRight />
        </section>

        {/* О нас */}
        <section
          // ref={(el) => { refsMap.current['#about'] = el; }}
          className={classes.about}
        >
          <About />
        </section>

        {/* Закажите выезд дизайнера-замерщика сегодня
          и получите проект мебели в течение 24 часов */}
        <section
          // ref={(el) => { refsMap.current['#call-designer'] = el; }}
          className={classes.callDesigner}
        >
          <CallDesigner />
        </section>

        {/* Форма вызова дизайнера-замерщика */}
        <section
          className={classes.callDesignerForm}
        >
          <CallDesignerForm />
        </section>

        {/* Наше производство */}
        <section
          // ref={(el) => { refsMap.current['#production'] = el; }}
          className={classes.ourProduction}
        >
          <OurProduction />
        </section>

        {/* Как заказать нашу мебель */}
        <section
          // ref={(el) => { refsMap.current['#how-to-order'] = el; }}
          className={classes.howToOrder}
        >
          <HowToOrder />
        </section>

        {/* Часто задаваемые вопросы */}
        <section
          // ref={(el) => { refsMap.current['#faq'] = el; }}
          className={classes.faq}
        >
          <FAQ />
        </section>

        {/* Форма "Остались вопросы?" */}
        <section
          // ref={(el) => { refsMap.current['#questions'] = el; }}
          className={classes.questionsForm}
        >
          <QuestionsForm />
        </section>

        {/* Изображение магазина */}
        <section
          // ref={(el) => { refsMap.current['#shop-img'] = el; }}
          className={classes.shopImg}
        >
          <ShopImg />
        </section>

        {/* Магазин на карте */}
        <section
          // ref={(el) => { refsMap.current['#contacts'] = el; }}
          className={classes.contacts}
        >
          <Map />
        </section>
      </main>
    </>
  );
};

export default HomePage;
