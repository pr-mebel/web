import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid } from '@material-ui/core';
import { BlockTitle } from '../block-title';
import { DesignCard } from './components';
import { LIST } from './constants';

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
                {LIST.map((item) => (
                    <Grid key={item.id} item xs={12} sm={6} md={3}>
                        <DesignCard Img={item.data.img}>{item.data.title}</DesignCard>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
