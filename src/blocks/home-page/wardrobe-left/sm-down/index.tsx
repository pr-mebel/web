import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import Image from 'next/image';
import img1 from 'public/images/home-page/wardrobe-left/wardrobe-1.jpg';
import img2 from 'public/images/home-page/wardrobe-left/wardrobe-2.jpg';
import img3 from 'public/images/home-page/wardrobe-left/wardrobe-3.jpg';
import React, { FC, useCallback, useState } from 'react';

import { BlockTitle, ButtonContainer, MainButton, Pagination } from '@/components/common';
import { usePagination } from '@/hooks';

import { WardrobeAdditionalBlock } from '../../wardrobe-additional-block';
import { ADDITIONAL, TABS } from '../constants';

const useStyles = makeStyles((theme) => ({
    imgContainer: {
        position: 'relative',
        paddingTop: '71.9%',
    },
    image: {
        width: '100%',
        opacity: '0',
        transition: 'opacity .3s ease-in-out',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
    },
    selectedImage: {
        opacity: '1',
    },
    list: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        marginTop: '40px',
    },
    listHorizontal: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    option: {
        color: 'black',
        transition: 'all 0.3s linear',
        marginBottom: '16px',
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
    active: {
        color: theme.palette.primary.main,
    },
    textBottom: {
        marginTop: '30px',
        minHeight: '130px',
    },
    buttonContainer: {
        marginTop: '32px',
    },
}));

export const WardrobeLeftSmDown: FC = () => {
    const classes = useStyles();
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const { current, onReset, onSet, swipableHandlers } = usePagination({
        total: ADDITIONAL.length,
    });

    /**
     * Переключает вкладки по клику
     */
    const handleClick = useCallback(
        (index) => () => {
            onReset();
            setActiveTabIndex(index);
        },
        [onReset]
    );

    return (
        <Container>
            <BlockTitle>
                <Typography variant="h4">Комфорт и удобство, продуманное до&nbsp;мелочей</Typography>
            </BlockTitle>
            <Grid container justifyContent="center">
                <Grid item xs>
                    <ul className={cn(classes.list, classes.listHorizontal)}>
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
                <Grid item xs={12} className={classes.imgContainer} {...swipableHandlers}>
                    <Image
                        src={img1}
                        layout="fill"
                        alt="Однотонный"
                        className={cn(classes.image, {
                            [classes.selectedImage]: current === 0 && activeTabIndex === 0,
                        })}
                        placeholder="blur"
                    />
                    <Image
                        src={img2}
                        layout="fill"
                        alt="Комбинированный"
                        className={cn(classes.image, {
                            [classes.selectedImage]: current === 0 && activeTabIndex === 1,
                        })}
                        placeholder="blur"
                    />
                    <Image
                        src={img3}
                        layout="fill"
                        alt="Кобминированный с Alcantara"
                        className={cn(classes.image, {
                            [classes.selectedImage]: current === 0 && activeTabIndex === 2,
                        })}
                        placeholder="blur"
                    />
                    {ADDITIONAL.map(({ data: { img, title }, id }, i) => (
                        <Image
                            key={id}
                            src={img}
                            alt={title}
                            className={cn(classes.image, {
                                [classes.selectedImage]: current - 1 === i,
                            })}
                            layout="fill"
                            objectFit="contain"
                            quality={100}
                        />
                    ))}
                </Grid>
                <Grid item xs={12}>
                    <Pagination numberOfPages={ADDITIONAL.length + 1} activeIndex={current} onChange={onSet} />
                </Grid>
                {current !== 0 ? (
                    <Grid item xs={10} className={classes.textBottom}>
                        <WardrobeAdditionalBlock
                            title={ADDITIONAL[current - 1].data.title}
                            text={ADDITIONAL[current - 1].data.text}
                        />
                    </Grid>
                ) : (
                    <Grid item xs={10} className={classes.textBottom}>
                        <Typography variant="body2">
                            Мы&nbsp;разработали специальные решения для оптимизации хранения ваших вещей, которые
                            позволяют сделать ежедневно пользование мебелью не&nbsp;только удобным и&nbsp;комфортным,
                            но&nbsp;еще и&nbsp;приятным
                        </Typography>
                    </Grid>
                )}
            </Grid>
            <div className={classes.buttonContainer}>
                <ButtonContainer>
                    <MainButton>Рассчитать стоимость</MainButton>
                </ButtonContainer>
            </div>
        </Container>
    );
};
