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
            <Section>
                <Catalog />
            </Section>
            <Section>
                <DesignOffer />
            </Section>
            <Section>
                <FeedbackForm />
            </Section>
            <Section>
                <Advantages />
            </Section>
            <Section>
                <WardrobeLeft />
            </Section>
            <Section>
                <WardrobeRight />
            </Section>
            <Section>
                <About />
            </Section>
            <Section>
                <CallDesigner />
            </Section>
            <Section>
                <CallDesignerForm />
            </Section>
            <Section>
                <OurProduction />
            </Section>
            <Section>
                <HowToOrder />
            </Section>
            <Section>
                <Faq />
            </Section>
            <Section>
                <QuestionsForm />
            </Section>
            <Section>
                <ShopImg />
            </Section>
            <Section>
                <Contacts />
            </Section>
        </main>
    );
};

export default HomePage;
