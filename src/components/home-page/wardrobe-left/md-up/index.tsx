import React, { FC, useState, useCallback } from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid } from '@material-ui/core';
import Image from 'next/image';
import { BlockTitle, MainButton } from '@/components/common';
import { WardrobeSnippet } from '../../wardrobe-snippet';
import { TABS, ADDITIONAL } from '../constants';

import img1 from 'public/images/home-page/wardrobe-left/wardrobe-1.jpg';
import img2 from 'public/images/home-page/wardrobe-left/wardrobe-2.jpg';
import img3 from 'public/images/home-page/wardrobe-left/wardrobe-3.jpg';

const useStyles = makeStyles((theme) => ({
    content: {
        marginTop: '26px',
    },
    imgWrapper: {
        position: 'relative',
        paddingTop: '73%',
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: '0',
        top: '0',
        left: '0',
        transition: 'opacity .3s ease-in-out',
    },
    selectedImage: {
        opacity: '1',
    },
    point: {
        position: 'absolute',
    },
    list: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        marginTop: '40px',
    },
    option: {
        color: 'black',
        transition: 'all .3s ease-in-out',
        marginBottom: '16px',
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
    active: {
        color: theme.palette.primary.main,
    },
    buttonContainer: {
        marginTop: '32px',
    },
}));

export const WardrobeLeftMdUp: FC = () => {
    const classes = useStyles();
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    /**
     * Переключает вкладки по клику
     */
    const handleClick = useCallback(
        (index) => () => {
            setActiveTabIndex(index);
        },
        [],
    );

    return (
        <Container>
            <BlockTitle>
                <Typography variant="h4">
                    Комфорт и удобство, продуманное до&nbsp;мелочей
                </Typography>
            </BlockTitle>
            <Grid container spacing={6} className={classes.content}>
                <Grid item xs={6}>
                    <div className={classes.imgWrapper}>
                        <Image
                            src={img1}
                            layout="fill"
                            alt='Однотонный'
                            className={cn(classes.image, {
                                [classes.selectedImage]: activeTabIndex === 0,
                            })}
                            placeholder='blur'
                        />
                        <Image
                            src={img2}
                            layout="fill"
                            alt='Комбинированный'
                            className={cn(classes.image, {
                                [classes.selectedImage]: activeTabIndex === 1,
                            })}
                            placeholder='blur'
                        />
                        <Image
                            src={img3}
                            layout="fill"
                            alt='Кобминированный с Alcantara'
                            className={cn(classes.image, {
                                [classes.selectedImage]: activeTabIndex === 2,
                            })}
                            placeholder='blur'
                        />
                        {ADDITIONAL.map((point) => (
                            <div
                                key={point.id}
                                className={classes.point}
                                style={{
                                    left: point.data.left,
                                    top: point.data.top,
                                }}
                            >
                                <WardrobeSnippet
                                    img={point.data.img}
                                    title={point.data.title}
                                    text={point.data.text}
                                    direction={point.data.direction}
                                />
                            </div>
                        ))}
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <Typography>
                        Мы&nbsp;разработали специальные решения для оптимизации хранения ваших
                        вещей, которые позволяют сделать ежедневно пользование мебелью
                        не&nbsp;только удобным и&nbsp;комфортным, но&nbsp;еще и&nbsp;приятным
                    </Typography>
                    <ul className={classes.list}>
                        {TABS.map((tab, i) => (
                            <li
                                key={tab.id}
                                className={cn(classes.option, {
                                    [classes.active]: activeTabIndex === i,
                                })}
                                onClick={handleClick(i)}
                            >
                                <Typography color="inherit" variant="h6">
                                    {tab.data.title}
                                </Typography>
                            </li>
                        ))}
                    </ul>
                </Grid>
            </Grid>
            <Grid container justify="center" className={classes.buttonContainer}>
                <Grid item xs={10} sm={6} md={4}>
                    <MainButton>Рассчитать стоимость</MainButton>
                </Grid>
            </Grid>
        </Container>
    );
};
