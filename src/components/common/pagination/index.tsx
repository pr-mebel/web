import React, { FC, useCallback, useMemo } from 'react';
import { range } from 'lodash';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { addIdsToArrayOfObjects } from '@/utils';
import { PaginationProps } from './types';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '20px',
        position: 'relative',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
    },
    list__container: {
        display: 'flex',
        justifyContent: 'center',
        width: '70%',
        margin: 'auto',
    },
    icon: {
        color: theme.palette.primary.main,
        width: '30px',
        height: '30px',
        position: 'absolute',
        top: '0',
    },
    icon_back: {
        left: '10px',
    },
    icon_next: {
        right: '10px',
    },
    circle: {
        width: '10px',
        height: '10px',
        content: '""',
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '50%',
        margin: '0 5px',
    },
    active: {
        background: theme.palette.primary.main,
    },
}));

export const Pagination: FC<PaginationProps> = ({ numberOfPages, activeIndex, onChange }) => {
    const classes = useStyles();

    const handleClickPrev = useCallback(() => {
        if (activeIndex === 0) {
            onChange(numberOfPages - 1);
        } else {
            onChange(activeIndex - 1);
        }
    }, [activeIndex, numberOfPages, onChange]);

    const handleClickNext = useCallback(() => {
        if (activeIndex === numberOfPages - 1) {
            onChange(0);
        } else {
            onChange(activeIndex + 1);
        }
    }, [activeIndex, numberOfPages, onChange]);

    const handleClickByIndex = useCallback(
        (i) => () => {
            if (activeIndex !== i) {
                onChange(i);
            }
        },
        [activeIndex, onChange],
    );

    return (
        <div className={classes.root}>
            <ArrowBackIosIcon
                className={cx(classes.icon, classes.icon_back)}
                onClick={handleClickPrev}
            />
            <div className={classes.list__container}>
                {range(numberOfPages).map((index) => (
                    <div
                        key={index}
                        className={cx(classes.circle, {
                            [classes.active]: index === activeIndex,
                        })}
                        onClick={handleClickByIndex(index)}
                    />
                ))}
            </div>
            <ArrowForwardIosIcon
                className={cx(classes.icon, classes.icon_next)}
                onClick={handleClickNext}
            />
        </div>
    );
};
