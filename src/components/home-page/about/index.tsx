import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Container, Typography, Grid } from '@material-ui/core';
import { BlockTitle } from '@/components/common';
import { CARDS } from './constants';
import { Card } from './components';

const useStyles = makeStyles({
    titleMiddle: {
        marginTop: '30px',
        fontWeight: 400,
    },
    grid: {
        marginTop: '14px',
    },
});

export const About = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Container>
            <BlockTitle>
                <Typography variant="h4">О нас</Typography>
            </BlockTitle>
            <Typography variant="h5" align="center" className={classes.titleMiddle}>
                Почему нас выбрали уже более 10 000 клиентов?
            </Typography>
            <Grid container spacing={isXsDown ? 2 : 4} className={classes.grid}>
                {CARDS.map((card) => (
                    <Grid item xs={10} sm={6} md={4} key={card.id}>
                        <Card
                            Img={card.data.img}
                            title={card.data.title}
                            text={card.data.text}
                        />
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h5" align="center" className={classes.titleMiddle}>
                Приходите, нам есть чем вас удивить!
            </Typography>
        </Container>
    );
};
