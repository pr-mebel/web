import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Container, Typography, Grid } from '@material-ui/core';
import { BlockTitle } from '@/components/common';
import { NB_SP, MDASH } from '@/constants';
import { Card, Icon } from './components';

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
                <Grid item xs={10} sm={6} md={4}>
                    <Card
                        img={<Icon id={0} />}
                        title='Богатый ассортимент'
                        text={`Мы${NB_SP}можем предложить Вам корпусную мебель для любой из${NB_SP}зон
                        вашего дома${NB_SP}${MDASH} от${NB_SP}кухни до${NB_SP}детской комнаты.
                        Более 1000 вариантов материалов и${NB_SP}отделок будут доступны для вашего выбора.
                        Это удобно, выгодно и${NB_SP}позволит сэкономит массу Вашего времени.`}
                    />
                </Grid>
                <Grid item xs={10} sm={6} md={4}>
                    <Card
                        img={<Icon id={1} />}
                        title='Высокое качество мебели'
                        text={`Мы${NB_SP}знаем. что качественная мебель видна сразу.
                        Приходите и${NB_SP}Вы увидите это сами. Вся продукция проходит
                        строжайший контроль качества фабрики. Поэтому она выглядит хорошо.`}
                    />
                </Grid>
                <Grid item xs={10} sm={6} md={4}>
                    <Card
                        img={<Icon id={2} />}
                        title={`Мы обустраиваем интерьеры более 20${NB_SP}лет`}
                        text={`За${NB_SP}это время мы${NB_SP}приобрели бесценный опыт,
                        который позволяет нам безупречно выполнять даже самые сложные проекты.
                        Приходите и${NB_SP}мы${NB_SP}поделимся этими знаниями с${NB_SP}Вами!`}
                    />
                </Grid>
                <Grid item xs={10} sm={6} md={4}>
                    <Card
                        img={<Icon id={3} />}
                        title='Большая экспозиция'
                        text={`Невозможно выбрать мебель, не${NB_SP}увидев и${NB_SP}не${NB_SP}потрогав
                        ее${NB_SP}руками. На${NB_SP}площади 300${NB_SP}м вы${NB_SP}сможете увидеть как
                        множество готовых образцов мебели, так и${NB_SP}подобрать все
                        необходимые материалы для будущего проекта.`}
                    />
                </Grid>
                <Grid item xs={10} sm={6} md={4}>
                    <Card
                        img={<Icon id={4} />}
                        title='Удобные расположение'
                        text={`Наш салон расположен в${NB_SP}одном из${NB_SP}самых транспортнодоступных
                        мест города Москвы в${NB_SP}районе${NB_SP}м. Сокол в${NB_SP}5${NB_SP}минутах
                        от${NB_SP}ТТК. Вам будет очень удобно добираться до${NB_SP}нас.`}
                    />
                </Grid>
                <Grid item xs={10} sm={6} md={4}>
                    <Card
                        img={<Icon id={5} />}
                        title='С нами надежно и безопасно'
                        text={`Наш салон являемся фирменным представительством фабрики,
                        никаких посредников от${NB_SP}этапа проектирования мебели до${NB_SP}монтажа.
                        Это позволяет найти решение даже в${NB_SP}самых нестандартных ситуациях.`}
                    />
                </Grid>
            </Grid>
            <Typography variant="h5" align="center" className={classes.titleMiddle}>
                Приходите, нам есть чем вас удивить!
            </Typography>
        </Container>
    );
};
