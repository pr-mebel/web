import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { FC } from 'react';

const useStyles = makeStyles((theme) => ({
    [theme.breakpoints.down('sm')]: {
        text: {
            display: 'none',
        },
    },
}));

export const TextBlock: FC = () => {
    const classes = useStyles();

    return (
        <Container>
            <Typography variant="body1" className={classes.text}>
                Независимо от&nbsp;того, какой стиль исполнения гардеробной вы&nbsp;выберите, будь&nbsp;то элегантная
                классика или идущий в&nbsp;ногу со&nbsp;временем модерн, мы&nbsp;гарантируем предоставить вам
                безупречный сервис, максимально функциональный и&nbsp;эргономичный дизайн, премиальные материалы, более
                1000 вариантов отделки и&nbsp;абсолютную точность изготовления и&nbsp;монтажа. Архитектурный подход
                к&nbsp;системам хранения и&nbsp;внимание к&nbsp;деталям, позволяют нам создавать поистине невероятные
                шедевры гардеробных систем.
            </Typography>
        </Container>
    );
};
