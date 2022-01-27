import { Container, Grid, Hidden, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import cn from 'classnames';
import Image from 'next/image';
import img1 from 'public/images/home-page/advantages/1.jpg';
import img2 from 'public/images/home-page/advantages/2.jpg';
import img3 from 'public/images/home-page/advantages/3.jpg';
import img4 from 'public/images/home-page/advantages/4.jpg';
import img5 from 'public/images/home-page/advantages/5.jpg';
import img6 from 'public/images/home-page/advantages/6.jpg';
import React, { FC } from 'react';

import { BlockTitle, ButtonContainer, MainButton } from '@/components/common';
import { usePagination } from '@/hooks';
import { addIdsToArrayOfObjects } from '@/utils';

import { Options, Tabs } from './components';

export const TABS = addIdsToArrayOfObjects([
    {
        title: 'Эмаль',
        list: [
            'Классичесике и современные модели фасадов',
            'Патина, матовые и глянцевые отделки',
            'Более 2000 оттенков',
            'Разработка фасадов по вашему образцу',
        ],
    },
    {
        title: 'Ламинат',
        list: [
            'Итальянские, немецкие и австрийские материалы',
            '100% экологичность, можно применять в детских комнатах',
            'Более 300 вариантов декоров под любой дизайн помещения',
            'Высокая износостойкость',
            'Декоративная ударопрочная кромка (не Китай).',
        ],
    },
    {
        title: '3D Ламинат',
        list: [
            'Европейские материалы',
            'Глубокая имитация текстуры натуральных материалов',
            'Более 50 вариантов декоров под древесину, камень, кожу',
            'Высокая износостойкость',
        ],
    },
    {
        title: 'Шпон',
        list: [
            'Подбор шпона по образцу',
            'Покраска эмалью',
            'Тонирование в нужный цвет',
            'Сохраняется точный рисунок древесины',
        ],
    },
    {
        title: 'Кожа',
        list: [
            'Прочный и долговечный материал',
            'Выглядит благородно и элегантно',
            'Создает атмосферу респектабельности и эксклюзивности',
        ],
    },
    {
        title: 'Стекло',
        list: [
            'Декоративные и крашеные стекла',
            'Декоративные и цветные зеркала',
            'Более 100 декоров',
            'Нанесение декоративной гравировки',
            'Художественное матирование стекла',
            'Составные панно из зеркал',
        ],
    },
]);

const useStyles = makeStyles((theme) => ({
    description: {
        marginTop: '30px',
    },
    materials: {
        marginTop: '40px',
    },
    tabs: {
        marginTop: '20px',
    },
    list: {
        margin: '0',
        marginTop: '20px',
        paddingLeft: '30px',
        listStyle: 'none',
    },
    listText: {
        fontSize: '16px',
        lineHeight: '1.2',
    },
    listItem: {
        position: 'relative',
        marginBottom: '4px',
    },
    listContainer: {
        minHeight: '175px',
    },
    check: {
        width: '20px',
        position: 'absolute',
        left: '-30px',
        top: '-3px',
        color: theme.palette.primary.main,
    },
    imgContainer: {
        position: 'relative',
        width: '100%',
        margin: 'auto',
        paddingTop: '66%',
    },
    image: {
        width: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        opacity: '0',
        transition: 'opacity .3s ease-in-out',
    },
    selectedImage: {
        opacity: '1',
    },
    icon: {
        height: '20px',
        position: 'absolute',
        top: '50%',
        cursor: 'pointer',
    },
    iconPrev: {
        left: '-30px',
    },
    iconNext: {
        right: '-30px',
    },
    buttonContainer: {
        marginTop: '32px',
    },
    [theme.breakpoints.down('xs')]: {
        buttonContainer: {
            marginTop: '20px',
        },
    },
}));

export const Advantages: FC = () => {
    const classes = useStyles();
    const { current, onSet, onPrev, onNext, swipableHandlers } = usePagination({
        total: TABS.length - 1,
    });

    return (
        <Container>
            <Hidden xsDown>
                <BlockTitle>
                    <Typography variant="h4">Преимущества нашей продукции</Typography>
                </BlockTitle>
                <Grid container className={classes.description}>
                    <Grid item xs={12} md={10}>
                        <Typography variant="body2">
                            Мы&nbsp;постоянно улучшаем качество, эргономические и&nbsp;эстетические параметры нашей
                            мебели. Начиная с&nbsp;подбора материалов и&nbsp;комплектующих мы&nbsp;создаем эксклюзивный
                            проект будущего изделия, который не&nbsp;просто идеально впишется в&nbsp;ваш интерьер,
                            а&nbsp;будет комфортен, удобен и&nbsp;функционален в&nbsp;использовании, и&nbsp;прослужит
                            Вам долгие годы.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} container className={classes.materials} spacing={2}>
                    <Grid item xs={12} sm={7} container direction="column">
                        <Grid item>
                            <BlockTitle>
                                <Typography variant="h5">
                                    Мы используем только премиальные{' '}
                                    <Hidden xsDown>
                                        <br />
                                    </Hidden>
                                    материалы для нашей мебели
                                </Typography>
                            </BlockTitle>
                        </Grid>
                    </Grid>
                    <Grid item xs={7} className={classes.tabs}>
                        <Tabs tabs={TABS} activeTab={current} onChange={onSet} />
                        <Options activeTab={current}>
                            {TABS.map((tab) => (
                                <div key={tab.id}>
                                    <ul className={classes.list}>
                                        {tab.data.list.map((option) => (
                                            <li key={option} className={classes.listItem}>
                                                <CheckIcon className={classes.check} />
                                                <Typography className={classes.listText}>{option}</Typography>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </Options>
                    </Grid>
                    <Grid item xs={5}>
                        <div className={classes.imgContainer}>
                            <Image
                                src={img1}
                                alt="Эмаль"
                                layout="fill"
                                className={cn(classes.image, {
                                    [classes.selectedImage]: current === 0,
                                })}
                                placeholder="blur"
                            />
                            <Image
                                src={img2}
                                alt="Ламинат"
                                layout="fill"
                                className={cn(classes.image, {
                                    [classes.selectedImage]: current === 1,
                                })}
                                placeholder="blur"
                            />
                            <Image
                                src={img3}
                                alt="3D Ламинат"
                                layout="fill"
                                className={cn(classes.image, {
                                    [classes.selectedImage]: current === 2,
                                })}
                                placeholder="blur"
                            />
                            <Image
                                src={img4}
                                alt="Шпон"
                                layout="fill"
                                className={cn(classes.image, {
                                    [classes.selectedImage]: current === 3,
                                })}
                                placeholder="blur"
                            />
                            <Image
                                src={img5}
                                alt="Кожа"
                                layout="fill"
                                className={cn(classes.image, {
                                    [classes.selectedImage]: current === 4,
                                })}
                                placeholder="blur"
                            />
                            <Image
                                src={img6}
                                alt="Стекло"
                                layout="fill"
                                className={cn(classes.image, {
                                    [classes.selectedImage]: current === 5,
                                })}
                                placeholder="blur"
                            />
                        </div>
                    </Grid>
                </Grid>
            </Hidden>
            <Hidden smUp>
                <Grid item xs={12} container className={classes.materials} direction="column" {...swipableHandlers}>
                    <Grid item xs={12}>
                        <BlockTitle>
                            <Typography variant="h5">
                                Мы используем только премиальные{' '}
                                <Hidden xsDown>
                                    <br />
                                </Hidden>
                                материалы для нашей мебели
                            </Typography>
                        </BlockTitle>
                    </Grid>
                    <Grid item xs={12} className={classes.tabs}>
                        <Tabs tabs={TABS} activeTab={current} onChange={onSet} />
                    </Grid>
                    <Grid item xs={10} className={classes.imgContainer}>
                        <svg className={cn(classes.icon, classes.iconPrev)} viewBox="0 0 14 24" onClick={onPrev}>
                            <path
                                d="M11.857 23.448a.807.807 0 0 0 .585.242.827.827 0 0 0 .585-1.41L2.746 12l10.28-10.28a.827.827 0 0 0-1.17-1.168L.994 11.416a.827.827 0 0 0 0 1.168l10.863 10.864z"
                                fill="#EB2F46"
                            />
                        </svg>
                        <Image
                            src={img1}
                            alt="Эмаль"
                            layout="fill"
                            className={cn(classes.image, {
                                [classes.selectedImage]: current === 0,
                            })}
                            placeholder="blur"
                        />
                        <Image
                            src={img2}
                            alt="Ламинат"
                            layout="fill"
                            className={cn(classes.image, {
                                [classes.selectedImage]: current === 1,
                            })}
                            placeholder="blur"
                        />
                        <Image
                            src={img3}
                            alt="3D Ламинат"
                            layout="fill"
                            className={cn(classes.image, {
                                [classes.selectedImage]: current === 2,
                            })}
                            placeholder="blur"
                        />
                        <Image
                            src={img4}
                            alt="Шпон"
                            layout="fill"
                            className={cn(classes.image, {
                                [classes.selectedImage]: current === 3,
                            })}
                            placeholder="blur"
                        />
                        <Image
                            src={img5}
                            alt="Кожа"
                            layout="fill"
                            className={cn(classes.image, {
                                [classes.selectedImage]: current === 4,
                            })}
                            placeholder="blur"
                        />
                        <Image
                            src={img6}
                            alt="Стекло"
                            layout="fill"
                            className={cn(classes.image, {
                                [classes.selectedImage]: current === 5,
                            })}
                            placeholder="blur"
                        />
                        <svg className={cn(classes.icon, classes.iconNext)} viewBox="0 0 14 24" onClick={onNext}>
                            <path
                                d="M2.143 23.448a.807.807 0 0 1-.585.242.827.827 0 0 1-.584-1.41L11.253 12 .973 1.72A.827.827 0 0 1 2.144.553l10.863 10.864a.827.827 0 0 1 0 1.168L2.143 23.449z"
                                fill="#EB2F46"
                            />
                        </svg>
                    </Grid>
                    <Grid item xs={12} className={classes.listContainer}>
                        <Options activeTab={current}>
                            {TABS.map((tab) => (
                                <ul key={tab.id} className={classes.list}>
                                    {tab.data.list.map((option) => (
                                        <li key={option} className={classes.listItem}>
                                            <CheckIcon className={classes.check} />
                                            <Typography className={classes.listText}>{option}</Typography>
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </Options>
                    </Grid>
                </Grid>
            </Hidden>
            <Grid item xs={12} className={classes.buttonContainer}>
                <ButtonContainer>
                    <MainButton>Рассчитать стоимость</MainButton>
                </ButtonContainer>
            </Grid>
        </Container>
    );
};
