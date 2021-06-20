import React, { FC, useCallback } from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { filters } from '@/constants';
import { FilterField, FilterValue, SectionID } from '@/entities';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
    },
    wrapper: {
        borderRadius: '5px',
        padding: '11px 48px 10px',
        display: 'inline-flex',
        alignItems: 'center',
        background: theme.palette.grey[100],
    },
    option: {
        cursor: 'pointer',
        padding: '0 20px',
        textTransform: 'uppercase',
    },
    selectedOption: {
        cursor: 'default',
        color: theme.palette.primary.main,
    },
    [theme.breakpoints.down('sm')]: {
        wrapper: {
            padding: '8px 15px 7px',
            background: 'none',
            display: 'flex',
            flexDirection: 'column',
        },
        dash: {
            display: 'none',
        },
        option: {
            padding: '3px 10px',
            fontSize: '14px',
            fontWeight: '600',
        },
    },
}));

type Props = {
    options: typeof filters.sections;
    value: SectionID;
    onChange: (arg0: { name: FilterField; value: FilterValue }) => void;
};


export const SectionPicker: FC<Props> = ({ options, value, onChange }) => {
    const classes = useStyles();

    /**
     * Обработчик выбора секции
     */
    const handleClick = useCallback(
        (value: FilterValue) => () => {
            onChange({
                name: 'section',
                value,
            });
        },
        [onChange],
    );

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                {options.map((section, i) => {
                    if (i !== options.length - 1) {
                        return (
                            <React.Fragment key={section.id}>
                                <Typography
                                    variant="body1"
                                    className={cn(classes.option, {
                                        [classes.selectedOption]: value === section.id,
                                    })}
                                    onClick={handleClick(section.id)}
                                >
                                    {section.title}
                                </Typography>
                                <span className={classes.dash}>&mdash;</span>
                            </React.Fragment>
                        );
                    }

                    return (
                        <Typography
                            key={section.id}
                            variant="body1"
                            className={cn(classes.option, {
                                [classes.selectedOption]: value === section.id,
                            })}
                            onClick={handleClick(section.id)}
                        >
                            {section.title}
                        </Typography>
                    );
                })}
            </div>
        </div>
    );
};
