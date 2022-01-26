import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import React, { FC, useCallback } from 'react';

import { LoadingBackground } from '@/components/common';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: '66.66%',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
    },
    img: {
        position: 'absolute',
        top: '0',
        left: '0',
        transition: 'all .5s',
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
        '&:after': {
            position: 'absolute',
            right: '25px',
            height: '100%',
            content: '""',
            top: '0',
            width: '.5px',
            background: 'white',
        },
    },
    tooltipText: {
        color: 'white',
        fontSize: '12px',
    },
    arrow: {
        position: 'absolute',
        color: 'white',
        width: '12px',
        height: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        right: '5px',
    },
    [theme.breakpoints.up('xs')]: {
        root: {
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
    },
}));

type Props = {
    imageUrlMin: string;
    collection: string;
    currentItemId: number;
    onClick: (arg0: number) => void;
};

export const Card: FC<Props> = ({ imageUrlMin, collection, currentItemId, onClick }) => {
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
                <Image layout="fill" objectFit="cover" src={imageUrlMin} alt={`Товар из коллекции ${collection}`} />
                <div className={classes.tooltip}>
                    <Typography className={classes.tooltipText}>{collection}</Typography>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={classes.arrow}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </div>
            </div>
        </LoadingBackground>
    );
};
