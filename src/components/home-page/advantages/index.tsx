import React, { FC, useCallback, useState } from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid, Hidden } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Image from 'next/image';
import { addIdsToArrayOfObjects } from '@/utils';
import { BlockTitle, MainButton } from '@/components/common';
import { Tabs, Options } from './components';

import img1 from 'public/images/home-page/advantages/1.jpg';
import img2 from 'public/images/home-page/advantages/2.jpg';
import img3 from 'public/images/home-page/advantages/3.jpg';
import img4 from 'public/images/home-page/advantages/4.jpg';
import img5 from 'public/images/home-page/advantages/5.jpg';
import img6 from 'public/images/home-page/advantages/6.jpg';


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
        position: 'absolute',
        top: '50%',
        color: theme.palette.primary.main,
        cursor: 'pointer',
    },
    iconBack: {
        left: '-30px',
    },
    iconForward: {
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
    const [activeTab, setActiveTab] = useState(0);

    const handleNextTab = useCallback(() => {
        setActiveTab((prev) => {
            if (prev === TABS.length - 1) {
                return 0;
            }

            return prev + 1;
        });
    }, []);

    const handlePrevTab = useCallback(() => {
        setActiveTab((prev) => {
            if (prev === 0) {
                return TABS.length - 1;
            }

            return prev - 1;
        });
    }, []);

    const handleChangeTab = useCallback((index) => {
        setActiveTab(index);
    }, []);

    return (
        <Container>
            <Hidden xsDown>
                <BlockTitle>
                    <Typography variant="h4">Преимущества нашей продукции</Typography>
                </BlockTitle>
                <Grid container className={classes.description}>
                    <Grid item xs={12} md={10}>
                        <Typography variant="body2">
                            Мы&nbsp;постоянно улучшаем качество, эргономические и&nbsp;эстетические
                            параметры нашей мебели. Начиная с&nbsp;подбора материалов
                            и&nbsp;комплектующих мы&nbsp;создаем эксклюзивный проект будущего
                            изделия, который не&nbsp;просто идеально впишется в&nbsp;ваш интерьер,
                            а&nbsp;будет комфортен, удобен и&nbsp;функционален в&nbsp;использовании,
                            и&nbsp;прослужит Вам долгие годы.
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
                        <Tabs tabs={TABS} activeTab={activeTab} onChange={handleChangeTab} />
                        <Options activeTab={activeTab}>
                            {TABS.map((tab) => (
                                <div key={tab.id}>
                                    <ul className={classes.list}>
                                        {tab.data.list.map((option) => (
                                            <li key={option} className={classes.listItem}>
                                                <CheckIcon className={classes.check} />
                                                <Typography className={classes.listText}>
                                                    {option}
                                                </Typography>
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
                                alt='Эмаль'
                                layout="fill"
                                className={cn(classes.image, {
                                    [classes.selectedImage]: activeTab === 0,
                                })}
                                placeholder='blur'
                            />
                            <Image
                                src={img2}
                                alt='Ламинат'
                                layout="fill"
                                className={cn(classes.image, {
                                    [classes.selectedImage]: activeTab === 1,
                                })}
                                placeholder='blur'
                            />
                            <Image
                                src={img3}
                                alt='3D Ламинат'
                                layout="fill"
                                className={cn(classes.image, {
                                    [classes.selectedImage]: activeTab === 2,
                                })}
                                placeholder='blur'
                            />
                            <Image
                                src={img4}
                                alt='Шпон'
                                layout="fill"
                                className={cn(classes.image, {
                                    [classes.selectedImage]: activeTab === 3,
                                })}
                                placeholder='blur'
                            />
                            <Image
                                src={img5}
                                alt='Кожа'
                                layout="fill"
                                className={cn(classes.image, {
                                    [classes.selectedImage]: activeTab === 4,
                                })}
                                placeholder='blur'
                            />
                            <Image
                                src={img6}
                                alt='Стекло'
                                layout="fill"
                                className={cn(classes.image, {
                                    [classes.selectedImage]: activeTab === 5,
                                })}
                                placeholder='blur'
                            />
                        </div>
                    </Grid>
                </Grid>
            </Hidden>
            <Hidden smUp>
                <Grid item xs={12} container className={classes.materials} direction="column">
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
                        <Tabs tabs={TABS} activeTab={activeTab} onChange={handleChangeTab} />
                    </Grid>
                    <Grid item xs={10} className={classes.imgContainer}>
                        <ArrowBackIosIcon
                            className={cn(classes.icon, classes.iconBack)}
                            onClick={handlePrevTab}
                        />
                        <Image
                            src={img1}
                            alt='Эмаль'
                            layout="fill"
                            className={cn(classes.image, {
                                [classes.selectedImage]: activeTab === 0,
                            })}
                            placeholder='blur'
                        />
                        <Image
                            src={img2}
                            alt='Ламинат'
                            layout="fill"
                            className={cn(classes.image, {
                                [classes.selectedImage]: activeTab === 1,
                            })}
                            placeholder='blur'
                        />
                        <Image
                            src={img3}
                            alt='3D Ламинат'
                            layout="fill"
                            className={cn(classes.image, {
                                [classes.selectedImage]: activeTab === 2,
                            })}
                            placeholder='blur'
                        />
                        <Image
                            src={img4}
                            alt='Шпон'
                            layout="fill"
                            className={cn(classes.image, {
                                [classes.selectedImage]: activeTab === 3,
                            })}
                            placeholder='blur'
                        />
                        <Image
                            src={img5}
                            alt='Кожа'
                            layout="fill"
                            className={cn(classes.image, {
                                [classes.selectedImage]: activeTab === 4,
                            })}
                            placeholder='blur'
                        />
                        <Image
                            src={img6}
                            alt='Стекло'
                            layout="fill"
                            className={cn(classes.image, {
                                [classes.selectedImage]: activeTab === 5,
                            })}
                            placeholder='blur'
                        />
                        <ArrowForwardIosIcon
                            className={cn(classes.icon, classes.iconForward)}
                            onClick={handleNextTab}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.listContainer}>
                        <Options activeTab={activeTab}>
                            {TABS.map((tab) => (
                                <ul key={tab.id} className={classes.list}>
                                    {tab.data.list.map((option) => (
                                        <li key={option} className={classes.listItem}>
                                            <CheckIcon className={classes.check} />
                                            <Typography className={classes.listText}>
                                                {option}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </Options>
                    </Grid>
                </Grid>
            </Hidden>
            <Grid item xs={12} container justify="center" className={classes.buttonContainer}>
                <Grid item xs={10} sm={6} md={4}>
                    <MainButton>Рассчитать стоимость</MainButton>
                </Grid>
            </Grid>
        </Container>
    );
};
