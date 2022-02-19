import { Container, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';

import { BlockTitle } from '@/components';

import { DesignCard, Icon } from './components';

export const DesignOffer: FC = () => (
    <Container>
        <BlockTitle>
            <Typography
                sx={{
                    fontSize: '30px',
                    lineHeight: '35px',
                    '@media (max-width: 1200px)': {
                        fontSize: '26px',
                        lineHeight: '30px',
                    },
                    '@media (max-width: 480px)': {
                        fontSize: '20px',
                        lineHeight: '23px',
                    },
                }}
                variant="h4"
            >
                Получите дизайн-проект
            </Typography>
            <Typography
                sx={{
                    fontSize: '30px',
                    lineHeight: '35px',
                    '@media (max-width: 1200px)': {
                        fontSize: '18px',
                        lineHeight: '30px',
                    },
                    '@media (max-width: 480px)': {
                        fontSize: '14px',
                        lineHeight: '23px',
                    },
                }}
                variant="h5"
            >
                и стоимость вашего проекта сегодня
            </Typography>
        </BlockTitle>
        <Grid
            sx={(theme) => ({
                marginTop: '48px',
                [theme.breakpoints.down('sm')]: {
                    marginTop: '24px',
                },
            })}
            container
            spacing={4}
        >
            <Grid item xs={12} sm={6} md={3}>
                <DesignCard img={<Icon id={0} />}>
                    Пришлите нам эскизы вашей мебели или просто оставьте свои контактные данные
                </DesignCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <DesignCard img={<Icon id={1} />}>
                    При необходимости, мы&nbsp;уточним детали и&nbsp;бесплатно разработаем проект в&nbsp;ЗД
                </DesignCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <DesignCard img={<Icon id={2} />}>
                    Предложим разные варианты наполнение шкафа или гардеробной
                </DesignCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <DesignCard img={<Icon id={3} />}>Сформируем лучшее предложение в рамках бюджета</DesignCard>
            </Grid>
        </Grid>
    </Container>
);
