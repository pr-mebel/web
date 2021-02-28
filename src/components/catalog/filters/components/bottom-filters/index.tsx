import React, { FC, useCallback } from 'react';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import { SectionId } from '@/entities';
import { BottomFiltersProps } from './types';

const useStyles = makeStyles((theme) => ({
    option: {
        display: 'inline-block',
        fontSize: '14px',
        color: theme.palette.grey[500],
        cursor: 'pointer',
    },
    selectedOption: {
        cursor: 'default',
        color: theme.palette.primary.main,
    },
    subtitle: {
        fontSize: '14px',
        fontWeight: 600,
        textTransform: 'uppercase',
    },
    optionsContainer: {
        marginTop: '10px',
    },
    dash: {
        margin: '0 10px',
    },
    [theme.breakpoints.down('md')]: {
        dash: {
            display: 'none',
        },
        option: {
            padding: '0 7px',
        },
    },
    [theme.breakpoints.down('xs')]: {
        secondOptionsGroup: {
            marginTop: '20px',
        },
    },
}));

export const BottomFilters: FC<BottomFiltersProps> = ({ filter, options, onChange }) => {
    const classes = useStyles();

    const handleClick = useCallback(
        (id, name) => () => {
            onChange({
                name,
                value: id,
            });
        },
        [onChange],
    );

    return (
        <Grid container spacing={2} alignItems="flex-start">
            {![SectionId.accessories, SectionId.lightingSystems].includes(filter.section) && (
                <Grid
                    item
                    container
                    xs={12}
                    sm={filter.section === options.sections[0].id ? 6 : 12}
                >
                    <Grid
                        item
                        container
                        xs={12}
                        justify="center"
                        className={classes.firstOptionsGroup}
                    >
                        <Typography variant="body1" className={classes.subtitle}>
                            Стиль
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        justify="center"
                        className={classes.optionsContainer}
                    >
                        {options.styles.map((option, i) => {
                            if (i !== options.styles.length - 1) {
                                return (
                                    <React.Fragment key={option.id}>
                                        <Typography
                                            variant="body2"
                                            component="span"
                                            className={cx(classes.option, {
                                                [classes.selectedOption]:
                                                    filter.style === option.id,
                                            })}
                                            onClick={handleClick(option.id, 'style')}
                                        >
                                            {option.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            component="span"
                                            className={classes.dash}
                                        >
                                            -
                                        </Typography>
                                    </React.Fragment>
                                );
                            }

                            return (
                                <Typography
                                    key={option.id}
                                    variant="body2"
                                    component="span"
                                    className={cx(classes.option, {
                                        [classes.selectedOption]: filter.style === option.id,
                                    })}
                                    onClick={handleClick(option.id, 'style')}
                                >
                                    {option.title}
                                </Typography>
                            );
                        })}
                    </Grid>
                </Grid>
            )}
            {filter.section === options.sections[0].id && (
                <Grid item container xs={12} sm={6}>
                    <Grid
                        item
                        container
                        xs={12}
                        justify="center"
                        className={classes.secondOptionsGroup}
                    >
                        <Typography variant="body1" className={classes.subtitle}>
                            Тип открывания дверей
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        justify="center"
                        className={classes.optionsContainer}
                    >
                        {options.doorTypes.map((option, i) => {
                            if (i !== options.doorTypes.length - 1) {
                                return (
                                    <React.Fragment key={option.id}>
                                        <Typography
                                            variant="body2"
                                            component="span"
                                            className={cx(classes.option, {
                                                [classes.selectedOption]:
                                                    filter.doorType === option.id,
                                            })}
                                            onClick={handleClick(option.id, 'doorType')}
                                        >
                                            {option.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            component="span"
                                            className={classes.dash}
                                        >
                                            -
                                        </Typography>
                                    </React.Fragment>
                                );
                            }

                            return (
                                <Typography
                                    key={option.id}
                                    variant="body2"
                                    component="span"
                                    className={cx(classes.option, {
                                        [classes.selectedOption]: filter.doorType === option.id,
                                    })}
                                    onClick={handleClick(option.id, 'doorType')}
                                >
                                    {option.title}
                                </Typography>
                            );
                        })}
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};
