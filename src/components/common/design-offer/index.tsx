import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid } from '@material-ui/core';
import { BlockTitle } from '../block-title';
import { DesignCard, Icon } from './components';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '48px',
    },
    biggerTitle: {
        fontSize: '30px',
        lineHeight: '35px',
    },
    smallerTitle: {
        fontSize: '30px',
        lineHeight: '35px',
    },
    img: {
        width: '70px',
        height: '70px',
        '& path': {
            fill: theme.palette.primary.main,
        },
    },
    [theme.breakpoints.down('xs')]: {
        img: {
            width: '45px',
            height: '45px',
        },
    },
    '@media (max-width: 400px)': {
        img: {
            width: '35px',
            height: '35px',
        },
    },

    '@media (max-width: 1200px)': {
        biggerTitle: {
            fontSize: '26px',
            lineHeight: '30px',
        },
        smallerTitle: {
            fontSize: '18px',
            lineHeight: '30px',
        },
    },

    [theme.breakpoints.down('xs')]: {
        container: {
            marginTop: '24px',
        },
    },
    '@media (max-width: 480px)': {
        biggerTitle: {
            fontSize: '20px',
            lineHeight: '23px',
        },
        smallerTitle: {
            fontSize: '14px',
            lineHeight: '23px',
        },
    },
}));

export const DesignOffer: FC = () => {
    const classes = useStyles();

    return (
        <Container>
            <BlockTitle>
                <Typography variant="h4" className={classes.biggerTitle}>
                    Получите дизайн-проект
                </Typography>
                <Typography variant="h5" className={classes.smallerTitle}>
                    и стоимость вашего проекта сегодня
                </Typography>
            </BlockTitle>
            <Grid container className={classes.container} spacing={4}>
                <Grid item xs={12} sm={6} md={3}>
                    <DesignCard
                        img={<Icon id={0} className={classes.img} />}
                    >
                        Пришлите нам эскизы вашей мебели или просто оставьте свои
                        контактные данные
                    </DesignCard>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <DesignCard
                        img={<Icon id={1} className={classes.img} />}
                    >
                        При необходимости, мы&nbsp;уточним детали и&nbsp;бесплатно
                        разработаем проект в&nbsp;ЗД
                    </DesignCard>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <DesignCard
                        img={<Icon id={2} className={classes.img} />}
                    >
                        Предложим разные варианты наполнение шкафа или гардеробной
                    </DesignCard>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <DesignCard
                        img={<Icon id={3} className={classes.img} />}
                    >
                        Сформируем лучшее предложение в рамках бюджета
                    </DesignCard>
                </Grid>
            </Grid>
        </Container>
    );
};
