import React, { useState, useCallback, useEffect, useRef, FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
        height: '20px',
    },
    navDesktop: {
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

export const Carousel: FC = () => {
    const classes = useStyles();
    const rootRef = useRef<HTMLDivElement>(null);

    const [activeSlide, setActiveSlide] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);

    /**
     * Крутит карусель
     */
    const { pause, unpause } = useInterval(
        () =>
            setActiveSlide((prev) => {
                if (prev < PAGES.length - 1) {
                    return prev + 1;
                }

                return 0;
            }),
        7000
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
    const handleChangeSlide = useCallback(
        (value) => {
            resetInterval();
            setActiveSlide(value);
        },
        [resetInterval]
    );

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
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange
            );
        };
    }, [pause, unpause]);

    return (
        <div className={classes.root} ref={rootRef}>
            <svg
                className={cn(
                    classes.prevDesktop,
                    classes.navDesktop,
                    classes.nav
                )}
                viewBox="0 0 14 24"
                onClick={handleClickPrev}
            >
                <path
                    d="M11.857 23.448a.807.807 0 0 0 .585.242.827.827 0 0 0 .585-1.41L2.746 12l10.28-10.28a.827.827 0 0 0-1.17-1.168L.994 11.416a.827.827 0 0 0 0 1.168l10.863 10.864z"
                    fill="#fff"
                />
            </svg>
            <div
                className={classes.slider}
                style={{
                    transform: `translateX(-${windowWidth * activeSlide}px)`,
                }}
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
            <svg
                className={cn(
                    classes.nextDesktop,
                    classes.navDesktop,
                    classes.nav
                )}
                viewBox="0 0 14 24"
                onClick={handleClickNext}
            >
                <path
                    d="M2.143 23.448a.807.807 0 0 1-.585.242.827.827 0 0 1-.584-1.41L11.253 12 .973 1.72A.827.827 0 0 1 2.144.553l10.863 10.864a.827.827 0 0 1 0 1.168L2.143 23.449z"
                    fill="#fff"
                />
            </svg>
            <div className={classes.paginationContainer}>
                <Container className={classes.paginationInnerContainer}>
                    <svg
                        className={cn(
                            classes.prevMobile,
                            classes.navMobile,
                            classes.nav
                        )}
                        viewBox="0 0 14 24"
                        onClick={handleClickPrev}
                    >
                        <path
                            d="M11.857 23.448a.807.807 0 0 0 .585.242.827.827 0 0 0 .585-1.41L2.746 12l10.28-10.28a.827.827 0 0 0-1.17-1.168L.994 11.416a.827.827 0 0 0 0 1.168l10.863 10.864z"
                            fill="#fff"
                        />
                    </svg>
                    <Pagination
                        currentPage={activeSlide}
                        numberOfPages={PAGES.length}
                        onChangeSlide={handleChangeSlide}
                    />
                    <svg
                        className={cn(
                            classes.nextMobile,
                            classes.navMobile,
                            classes.nav
                        )}
                        viewBox="0 0 14 24"
                        onClick={handleClickNext}
                    >
                        <path
                            d="M2.143 23.448a.807.807 0 0 1-.585.242.827.827 0 0 1-.584-1.41L11.253 12 .973 1.72A.827.827 0 0 1 2.144.553l10.863 10.864a.827.827 0 0 1 0 1.168L2.143 23.449z"
                            fill="#fff"
                        />
                    </svg>
                </Container>
            </div>
        </div>
    );
};
