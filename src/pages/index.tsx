import { styled } from '@mui/material/styles';
import React, { FC } from 'react';

import { Contacts, DesignOffer, ShopImg } from '@/blocks/common';
import {
    About,
    Advantages,
    CallDesigner,
    CallDesignerForm,
    Carousel,
    Catalog,
    Faq,
    FeedbackForm,
    HowToOrder,
    OurProduction,
    QuestionsForm,
    TextBlock,
    WardrobeLeft,
    WardrobeRight,
} from '@/blocks/home';

const Section = styled('section')(({ theme }) => ({
    marginTop: '80px',
    [theme.breakpoints.down('sm')]: {
        marginTop: '40px',
    },
}));

const HomePage: FC = () => {
    return (
        <main>
            <Section sx={{ marginTop: '0' }}>
                <Carousel />
            </Section>
            {/* Текст под каруселью */}
            <Section>
                <TextBlock />
            </Section>
            <Section id="catalog">
                <Catalog />
            </Section>
            <Section id="design-offer">
                <DesignOffer />
            </Section>
            <Section>
                <FeedbackForm />
            </Section>
            <Section id="advantages">
                <Advantages />
            </Section>
            <Section id="comfort">
                <WardrobeLeft />
            </Section>
            <Section id="quality">
                <WardrobeRight />
            </Section>
            <Section id="about">
                <About />
            </Section>
            <Section id="call-designer">
                <CallDesigner />
            </Section>
            <Section>
                <CallDesignerForm />
            </Section>
            <Section id="production">
                <OurProduction />
            </Section>
            <Section id="how-to-order">
                <HowToOrder />
            </Section>
            <Section id="faq">
                <Faq />
            </Section>
            <Section id="questions">
                <QuestionsForm />
            </Section>
            <Section>
                <ShopImg />
            </Section>
            <Section id="contacts">
                <Contacts />
            </Section>
        </main>
    );
};

export default HomePage;
