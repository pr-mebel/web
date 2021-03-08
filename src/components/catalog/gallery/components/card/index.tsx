import React, { FC, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { LoadingBackground, ImageProgressive } from '@/components';
import { CardProps } from './types';

const useStyles = makeStyles(() => ({
    root: {
        paddingTop: '66.66%',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover $tooltip': {
            transform: 'translateY(0)',
        },
        '&:hover $img': {
            transform: 'scale(1.1)',
        },
        '&:hover': {
            '&::after': {
                background: 'rgba(0, 0, 0, .3)',
            },
        },
        '&::after': {
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            content: '""',
            zIndex: '20',
            position: 'absolute',
            background: 'rgba(0,0,0,0)',
            transition: 'background .3s',
        },
    },
    img: {
        transition: 'transform .5s',
    },
    tooltip: {
        transform: 'translateY(100%)',
        transition: 'transform .2s ease-out',
        position: 'absolute',
        zIndex: 30,
        bottom: '0',
        left: '0',
        padding: '5px 40px 5px 15px',
        backgroundColor: 'rgba(119, 119, 119, 0.72)',
    },
    tooltipText: {
        color: 'white',
    },
    arrow: {
        position: 'absolute',
        color: 'white',
        bottom: '5px',
        right: '5px',
    },
}));

export const Card: FC<CardProps> = ({ imageUrlMin, collection, currentItemId, onClick }) => {
    const classes = useStyles();

    /**
     * Обработчик клика на конкретную карточку
     */
    const handleClick = useCallback(() => {
        onClick(currentItemId);
    }, [onClick, currentItemId]);

    return (
        <LoadingBackground>
            <div className={classes.root} onClick={handleClick}>
                <ImageProgressive
                    src={imageUrlMin}
                    alt={`Товар из коллекции ${collection}`}
                    className={classes.img}
                />
                <div className={classes.tooltip}>
                    <Typography className={classes.tooltipText}>{collection}</Typography>
                    <ArrowForwardIcon className={classes.arrow} />
                </div>
            </div>
        </LoadingBackground>
    );
};
