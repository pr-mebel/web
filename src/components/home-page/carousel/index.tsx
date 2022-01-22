import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { usePagination } from '@/hooks';

import { Page, Pagination } from './components';
import { PAGES } from './constants';

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

    const { current, interval, onNext, onPrev, onSet, swipableHandlers } = usePagination({
        total: PAGES.length - 1,
        changePageIntervalTime: 7000,
        resetIntervalTime: 3000,
        resetIntervalOnChange: true,
    });

    const [windowWidth, setWindowWidth] = useState(0);

    /**
     * Переключает слайд
     */
    const handleChangeSlide = useCallback(
        (value) => {
            onSet(value);
        },
        [onSet]
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
                interval.pause();
            } else {
                interval.unpause();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [interval]);

    return (
        <div className={classes.root} ref={rootRef}>
            <svg
                className={cn(classes.prevDesktop, classes.navDesktop, classes.nav)}
                viewBox="0 0 14 24"
                onClick={onPrev}
            >
                <path
                    d="M11.857 23.448a.807.807 0 0 0 .585.242.827.827 0 0 0 .585-1.41L2.746 12l10.28-10.28a.827.827 0 0 0-1.17-1.168L.994 11.416a.827.827 0 0 0 0 1.168l10.863 10.864z"
                    fill="#fff"
                />
            </svg>
            <div
                className={classes.slider}
                style={{
                    transform: `translateX(-${windowWidth * current}px)`,
                }}
                {...swipableHandlers}
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
                className={cn(classes.nextDesktop, classes.navDesktop, classes.nav)}
                viewBox="0 0 14 24"
                onClick={onNext}
            >
                <path
                    d="M2.143 23.448a.807.807 0 0 1-.585.242.827.827 0 0 1-.584-1.41L11.253 12 .973 1.72A.827.827 0 0 1 2.144.553l10.863 10.864a.827.827 0 0 1 0 1.168L2.143 23.449z"
                    fill="#fff"
                />
            </svg>
            <div className={classes.paginationContainer}>
                <Container className={classes.paginationInnerContainer}>
                    <svg
                        className={cn(classes.prevMobile, classes.navMobile, classes.nav)}
                        viewBox="0 0 14 24"
                        onClick={onPrev}
                    >
                        <path
                            d="M11.857 23.448a.807.807 0 0 0 .585.242.827.827 0 0 0 .585-1.41L2.746 12l10.28-10.28a.827.827 0 0 0-1.17-1.168L.994 11.416a.827.827 0 0 0 0 1.168l10.863 10.864z"
                            fill="#fff"
                        />
                    </svg>
                    <Pagination currentPage={current} numberOfPages={PAGES.length} onChangeSlide={handleChangeSlide} />
                    <svg
                        className={cn(classes.nextMobile, classes.navMobile, classes.nav)}
                        viewBox="0 0 14 24"
                        onClick={onNext}
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
