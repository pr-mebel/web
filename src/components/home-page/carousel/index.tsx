import React, { useState, useCallback, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import cn from 'classnames';
import { Container } from '@material-ui/core';
import { useInterval } from '@/utils';
import { PAGES } from './constants';
import { Page, Pagination } from './components';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
    },
    slider: {
        position: 'relative',
        display: 'flex',
        width: `${PAGES.length}00%`,
        height: '100%',
        transition: 'all .4s ease-in-out',
    },
    paginationContainer: {
        position: 'absolute',
        bottom: '100px',
        width: '100%',
        '@media (max-width: 1250px)': {
            bottom: '50px',
        },
    },
    paginationInnerContainer: {
        maxWidth: '1140px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: '0',
    },
    nav: {
        color: 'white',
    },
    navDesktop: {
        width: '40px',
        height: '40px',
        color: 'white',
        position: 'absolute',
        cursor: 'pointer',
        zIndex: 50,
    },
    prevDesktop: {
        top: '50%',
        left: '30px',
    },
    nextDesktop: {
        top: '50%',
        right: '30px',
    },
    navMobile: {
        display: 'none',
    },
    prevMobile: {
        marginRight: theme.spacing(3),
    },
    nextMobile: {
        marginLeft: theme.spacing(3),
    },
    '@media (max-width: 1250px)': {
        paginationInnerContainer: {
            justifyContent: 'center',
        },
        navDesktop: {
            display: 'none',
        },
        navMobile: {
            display: 'block',
        },
    },
}));

export const Carousel = () => {
    const classes = useStyles();
    const rootRef = useRef<HTMLDivElement>(null);

    const [activeSlide, setActiveSlide] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);

    /**
     * Крутит карусель
     */
    const { pause, unpause } = useInterval(
        () => setActiveSlide((prev) => {
            if (prev < PAGES.length - 1) {
                return prev + 1;
            }

            return 0;
        }),
        7000,
    );

    /**
     * Перезапускает интервал прокрутки карусели
     */
    const resetInterval = useCallback(() => {
        pause();

        setTimeout(unpause, 10000);
    }, [pause, unpause]);

    /**
     * Обработчик стрелочку назад
     */
    const handleClickPrev = useCallback(() => {
        resetInterval();
        setActiveSlide((prev) => {
            if (prev > 0) {
                return prev - 1;
            }

            return PAGES.length - 1;
        });
    }, [resetInterval]);

    /**
     * Обработчик стрелочку вперед
     */
    const handleClickNext = useCallback(() => {
        resetInterval();
        setActiveSlide((prev) => {
            if (prev < PAGES.length - 1) {
                return prev + 1;
            }

            return 0;
        });
    }, [resetInterval]);

    /**
     * Переключает слайд
     */
    const handleChangeSlide = useCallback((value) => {
        resetInterval();
        setActiveSlide(value);
    }, [resetInterval]);

    /**
     * Следит за изменением ширины окна
     */
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(rootRef.current ? rootRef.current.offsetWidth : 0);
        };

        if (rootRef.current) {
            handleResize();
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [rootRef]);


    /**
     * Следит за тем открыта ли эта страница.
     * Если нет, то останавливает прокрутку карусели
     */
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                pause();
            } else {
                unpause();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return (
        <div className={classes.root} ref={rootRef}>
            <ArrowBackIosIcon
                className={cn(classes.prevDesktop, classes.navDesktop, classes.nav)}
                onClick={handleClickPrev}
            />
            <div
                className={classes.slider}
                style={{ transform: `translateX(-${windowWidth * activeSlide}px)` }}
            >
                {PAGES.map((page, id) => (
                    <Page
                        key={page.id}
                        titles={page.data.titles}
                        subtitles={page.data.subtitles}
                        texts={page.data.texts}
                        pageID={id}
                        to={page.data.to}
                    />
                ))}
            </div>
            <ArrowForwardIosIcon
                className={cn(classes.nextDesktop, classes.navDesktop, classes.nav)}
                onClick={handleClickNext}
            />
            <div className={classes.paginationContainer}>
                <Container className={classes.paginationInnerContainer}>
                    <ArrowBackIosIcon
                        className={cn(classes.prevMobile, classes.navMobile, classes.nav)}
                        onClick={handleClickPrev}
                    />
                    <Pagination
                        currentPage={activeSlide}
                        numberOfPages={PAGES.length}
                        onChangeSlide={handleChangeSlide}
                    />
                    <ArrowForwardIosIcon
                        className={cn(classes.nextMobile, classes.navMobile, classes.nav)}
                        onClick={handleClickNext}
                    />
                </Container>
            </div>
        </div>
    );
};
