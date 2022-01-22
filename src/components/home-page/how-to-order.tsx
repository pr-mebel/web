import { Container, Grid, Hidden, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { FC } from 'react';

import { BlockTitle, MainButton } from '@/components/common';
import { NB_SP } from '@/constants';

const LIST = [
    {
        id: '01',
        title: 'Оставьте заявку на сайте или закажите звонок',
        text: `Наш менеджер свяжется с${NB_SP}вами, ответит на${NB_SP}все вопросы,
    и${NB_SP}предложит вам наиболее удобный способ работы над вашим проектом`,
    },
    {
        id: '02',
        title: 'Разработка дизайн-проекта мебели',
        text: `Вы${NB_SP}можете прислать ваши эскизы или просто планировки
    нам и${NB_SP}наши специалисты разработают дизайн-проект
    будущей мебели и${NB_SP}рассчитают его стоимость`,
    },
    {
        id: '03',
        title: 'Выезд дизайнера-замерщика на дом',
        text: `Наш специалист приедет в${NB_SP}удобное для вас время, сделает
    нужные замеры и${NB_SP}согласует все детали будущего проекта`,
    },
    {
        id: '04',
        title: 'Изготовление мебели',
        text: `Наша мебель изготавливается на${NB_SP}промышленных обрабатывающих
    центрах с${NB_SP}числовым программным управлением. Вы${NB_SP}получите
    действительно качественную мебель европейского уровня`,
    },
    {
        id: '05',
        title: 'Доставка и монтаж',
        text: `Собственная служба сервиса доставит и${NB_SP}установит вашу
    мебель в${NB_SP}оговоренное время. Мы${NB_SP}сами отвечаем
    за${NB_SP}качество проекта от${NB_SP}самого начала
    до${NB_SP}момента его установки у${NB_SP}вас дома`,
    },
];

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '32px',
    },
    item: {
        position: 'relative',
    },
    number: {
        position: 'absolute',
        fontSize: '120px',
        lineHeight: '120px',
        color: theme.palette.primary.main,
        opacity: '.07',
        top: '-5px',
        left: '20px',
        fontWeight: 700,
        [theme.breakpoints.down('xs')]: {
            fontSize: '70px',
            lineHeight: '70px',
        },
    },
    title: {
        fontSize: '16px',
    },
    text: {
        marginTop: '20px',
    },
    buttonContainer: {
        marginTop: '36px',
        '@media (max-width: 960px)': {
            '&': {
                marginTop: '0',
            },
        },
    },
}));

export const HowToOrder: FC = () => {
    const classes = useStyles();

    return (
        <Container>
            <BlockTitle>
                <Typography variant="h4">Как заказать нашу мебель</Typography>
            </BlockTitle>
            <Grid container spacing={4} className={classes.container}>
                <Hidden xsDown>
                    <Grid item xs={4} className={classes.item}>
                        <Typography className={classes.number}>01</Typography>
                        <BlockTitle>
                            <Typography variant="h6">Оставьте заявку на сайте или закажите звонок</Typography>
                        </BlockTitle>
                        <Typography variant="body2" className={classes.text}>
                            Наш менеджер свяжется с&nbsp;вами, ответит на&nbsp;все вопросы, и&nbsp;предложит вам
                            наиболее удобный способ работы над вашим проектом
                        </Typography>
                    </Grid>
                    <Grid item xs={4} className={classes.item}>
                        <Typography className={classes.number}>02</Typography>
                        <BlockTitle>
                            <Typography variant="h6">Разработка дизайн-проекта мебели</Typography>
                        </BlockTitle>
                        <Typography variant="body2" className={classes.text}>
                            Вы&nbsp;можете прислать ваши эскизы или просто планировки нам и&nbsp;наши специалисты
                            разработают дизайн-проект будущей мебели и&nbsp;рассчитают его стоимость
                        </Typography>
                    </Grid>
                    <Grid item xs={4} className={classes.item}>
                        <Typography className={classes.number}>03</Typography>
                        <BlockTitle>
                            <Typography variant="h6">Выезд дизайнера-замерщика на дом</Typography>
                        </BlockTitle>
                        <Typography variant="body2" className={classes.text}>
                            Наш специалист приедет в&nbsp;удобное для вас время, сделает нужные замеры и&nbsp;согласует
                            все детали будущего проекта
                        </Typography>
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={8} container spacing={6}>
                        <Grid item xs={6} className={classes.item}>
                            <Typography className={classes.number}>04</Typography>
                            <BlockTitle>
                                <Typography variant="h6">Изготовление мебели</Typography>
                            </BlockTitle>
                            <Typography variant="body2" className={classes.text}>
                                Наша мебель изготавливается на&nbsp;промышленных обрабатывающих центрах с&nbsp;числовым
                                программным управлением. Вы&nbsp;получите действительно качественную мебель европейского
                                уровня
                            </Typography>
                        </Grid>
                        <Grid item xs={6} className={classes.item}>
                            <Typography className={classes.number}>05</Typography>
                            <BlockTitle>
                                <Typography variant="h6">Доставка и монтаж</Typography>
                            </BlockTitle>
                            <Typography variant="body2" className={classes.text}>
                                Собственная служба сервиса доставит и&nbsp;установит вашу мебель в&nbsp;оговоренное
                                время. Мы&nbsp;сами отвечаем за&nbsp;качество проекта от&nbsp;самого начала
                                до&nbsp;момента его установки у&nbsp;вас дома
                            </Typography>
                        </Grid>
                    </Grid>
                </Hidden>
                <Hidden smUp>
                    {LIST.map((item) => (
                        <Grid key={item.id} item xs={12} className={classes.item}>
                            <Typography className={classes.number}>{item.id}</Typography>
                            <BlockTitle>
                                <Typography variant="h6">{item.title}</Typography>
                            </BlockTitle>
                            <Typography variant="body2" className={classes.text}>
                                {item.text}
                            </Typography>
                        </Grid>
                    ))}
                </Hidden>
                <Grid item xs={12} container justifyContent="center" className={classes.buttonContainer}>
                    <Grid item xs={10} sm={6} md={4}>
                        <MainButton>Оставить заявку</MainButton>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};
