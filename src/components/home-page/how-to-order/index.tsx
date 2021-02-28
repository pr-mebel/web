import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid, Hidden } from '@material-ui/core';
import { BlockTitle, MainButton } from '@/components/common';
import { LIST } from './constants';

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
    'button-container': {
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
                            <Typography variant="h6">
                                Оставьте заявку на сайте или закажите звонок
                            </Typography>
                        </BlockTitle>
                        <Typography variant="body2" className={classes.text}>
                            Наш менеджер свяжется с&nbsp;вами, ответит на&nbsp;все вопросы,
                            и&nbsp;предложит вам наиболее удобный способ работы над вашим проектом
                        </Typography>
                    </Grid>
                    <Grid item xs={4} className={classes.item}>
                        <Typography className={classes.number}>02</Typography>
                        <BlockTitle>
                            <Typography variant="h6">Разработка дизайн-проекта мебели</Typography>
                        </BlockTitle>
                        <Typography variant="body2" className={classes.text}>
                            Вы&nbsp;можете прислать ваши эскизы или просто планировки нам
                            и&nbsp;наши специалисты разработают дизайн-проект будущей мебели
                            и&nbsp;рассчитают его стоимость
                        </Typography>
                    </Grid>
                    <Grid item xs={4} className={classes.item}>
                        <Typography className={classes.number}>03</Typography>
                        <BlockTitle>
                            <Typography variant="h6">Выезд дизайнера-замерщика на дом</Typography>
                        </BlockTitle>
                        <Typography variant="body2" className={classes.text}>
                            Наш специалист приедет в&nbsp;удобное для вас время, сделает нужные
                            замеры и&nbsp;согласует все детали будущего проекта
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
                                Наша мебель изготавливается на&nbsp;промышленных обрабатывающих
                                центрах с&nbsp;числовым программным управлением. Вы&nbsp;получите
                                действительно качественную мебель европейского уровня
                            </Typography>
                        </Grid>
                        <Grid item xs={6} className={classes.item}>
                            <Typography className={classes.number}>05</Typography>
                            <BlockTitle>
                                <Typography variant="h6">Доставка и монтаж</Typography>
                            </BlockTitle>
                            <Typography variant="body2" className={classes.text}>
                                Собственная служба сервиса доставит и&nbsp;установит вашу мебель
                                в&nbsp;оговоренное время. Мы&nbsp;сами отвечаем за&nbsp;качество
                                проекта от&nbsp;самого начала до&nbsp;момента его установки
                                у&nbsp;вас дома
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
                <Grid
                    item
                    xs={12}
                    container
                    justify="center"
                    className={classes['button-container']}
                >
                    <Grid item xs={10} sm={6} md={4}>
                        <MainButton>Оставить заявку</MainButton>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};
