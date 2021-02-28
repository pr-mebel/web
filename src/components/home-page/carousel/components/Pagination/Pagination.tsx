import React, { FC, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import cn from 'classnames';
import { range } from 'lodash';
import { PaginationProps } from './types';

const useStyles = makeStyles(() => ({
    root: {
        position: 'relative',
        zIndex: 10,
        display: 'flex',
    },
    item: {
        width: '50px',
        height: '50px',
        background: 'none',
        border: 'none',
        color: 'white',
        display: 'flex',
        padding: '0',
        justifyContent: 'center',
        alignItems: 'center',
        '&:focus': {
            outline: 'none',
        },
        '@media (max-width: 768px)': {
            width: '36px',
            height: '36px',
        },
    },
    active: {
        position: 'relative',
        '&:after': {
            position: 'absolute',
            top: '0',
            left: '0',
            width: 'calc(100% - 4px)',
            height: 'calc(100% - 4px)',
            content: '""',
            borderRadius: '50%',
            border: 'solid 2px white',
        },
    },
    text: {
        color: 'inherit',
        cursor: 'pointer',
    },
}));

export const Pagination: FC<PaginationProps> = ({ currentPage, numberOfPages, onChangeSlide }) => {
    const classes = useStyles();

    const handleClick = useCallback(
        (index) => () => {
            onChangeSlide(index);
        },
        [onChangeSlide],
    );

    return (
        <div className={classes.root}>
            {range(numberOfPages).map((index) => (
                <button
                    key={index}
                    type="button"
                    className={cn(classes.item, {
                        [classes.active]: currentPage === index,
                    })}
                    onClick={handleClick(index)}
                >
                    <Typography className={classes.text}>{index + 1}</Typography>
                </button>
            ))}
        </div>
    );
};
