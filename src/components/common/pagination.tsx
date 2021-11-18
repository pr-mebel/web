import React, { FC, useCallback } from 'react';
import { range } from 'lodash';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '20px',
        position: 'relative',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
    },
    listContainer: {
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
    iconBack: {
        left: '10px',
    },
    iconNext: {
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

type Props = {
    numberOfPages: number;
    activeIndex: number;
    onChange: (arg0: number) => void;
};

export const Pagination: FC<Props> = ({
    numberOfPages,
    activeIndex,
    onChange,
}) => {
    const classes = useStyles();

    /**
     * Обработчик клика стрелочки назад
     */
    const handleClickPrev = useCallback(() => {
        if (activeIndex === 0) {
            onChange(numberOfPages - 1);
        } else {
            onChange(activeIndex - 1);
        }
    }, [activeIndex, numberOfPages, onChange]);

    /**
     * Обработчик клика стрелочки вперед
     */
    const handleClickNext = useCallback(() => {
        if (activeIndex === numberOfPages - 1) {
            onChange(0);
        } else {
            onChange(activeIndex + 1);
        }
    }, [activeIndex, numberOfPages, onChange]);

    /**
     * Обработчик клика на номер страницы
     */
    const handleClickByIndex = useCallback(
        (i) => () => {
            if (activeIndex !== i) {
                onChange(i);
            }
        },
        [activeIndex, onChange]
    );

    return (
        <div className={classes.root}>
            <ArrowBackIosIcon
                className={cn(classes.icon, classes.iconBack)}
                onClick={handleClickPrev}
            />
            <div className={classes.listContainer}>
                {range(numberOfPages).map((index) => (
                    <div
                        key={index}
                        className={cn(classes.circle, {
                            [classes.active]: index === activeIndex,
                        })}
                        onClick={handleClickByIndex(index)}
                    />
                ))}
            </div>
            <ArrowForwardIosIcon
                className={cn(classes.icon, classes.iconNext)}
                onClick={handleClickNext}
            />
        </div>
    );
};
