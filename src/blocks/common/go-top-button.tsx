import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import cn from 'classnames';
import React, { FC, useCallback } from 'react';

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
            <svg width="50" height="50" viewBox="0 0 50 50" className={classes.img}>
                <path
                    d="M36.449 32.572a.807.807 0 0 1 .241.584.827.827 0 0 1-1.41.584L25 23.462l-10.279 10.28a.827.827 0 0 1-1.169-1.17l10.864-10.863a.827.827 0 0 1 1.169 0l10.864 10.864z"
                    fill="black"
                />
                <path
                    d="M36.449 24a.807.807 0 0 1 .241.584.827.827 0 0 1-1.41.585L25 14.889 14.721 25.17A.827.827 0 0 1 13.552 24l10.864-10.863a.827.827 0 0 1 1.169 0L36.449 24z"
                    fill="black"
                />
            </svg>
        </div>
    );
};
