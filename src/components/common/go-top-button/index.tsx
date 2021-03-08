import React, { FC, useCallback } from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Img from './assets/top-btn.svg';

const useStyles = makeStyles(() => ({
    root: {
        position: 'fixed',
        right: '-100px',
        top: '60px',
        cursor: 'pointer',
        zIndex: 1000,
        transition: '.3s all ease-out',
    },
    rootVisible: {
        right: '10px',
    },
    img: {
        position: 'relative',
        zIndex: 1010,
        '& path': {
            fill: 'black',
        },
    },
}));

export const GoTopButton: FC = () => {
    const classes = useStyles();
    /**
     * Флаг, отвечающий за отрисовку компоненты
     */
    const trigger = useScrollTrigger({
        threshold: 1500,
    });

    /**
     * Обработчик клика на кнопку
     */
    const handleClick = useCallback(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, []);

    return (
        <div
            onClick={handleClick}
            className={cn(classes.root, {
                [classes.rootVisible]: trigger,
            })}
        >
            <Img className={classes.img} />
        </div>
    );
};
