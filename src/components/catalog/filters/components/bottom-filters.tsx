import React, { FC, useCallback } from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import {
    SectionID,
    StyleID,
    DoorTypeID,
    FilterField,
    FilterValue,
} from '@/entities';
import { filters as filterOptions } from '@/constants';

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

type Props = {
    filter: {
        section: SectionID;
        style: StyleID;
        doorType: DoorTypeID;
    };
    onChange: (arg0: { name: FilterField; value: FilterValue }) => void;
};

export const BottomFilters: FC<Props> = ({ filter, onChange }) => {
    const classes = useStyles();

    /**
     * Обработчик клика на фильтр стиля или тип двери
     */
    const handleClick = useCallback(
        (name: FilterField, value: FilterValue) => () => {
            onChange({
                name,
                value,
            });
        },
        [onChange]
    );

    return (
        <Grid container spacing={2} alignItems="flex-start">
            {!(
                filter.section === 'accessories' ||
                filter.section === 'lightingSystems'
            ) && (
                <Grid
                    item
                    container
                    xs={12}
                    sm={filter.section === 'cupboard' ? 6 : 12}
                >
                    <Grid
                        item
                        container
                        xs={12}
                        justifyContent="center"
                        className={classes.firstOptionsGroup}
                    >
                        <Typography
                            variant="body1"
                            className={classes.subtitle}
                        >
                            Стиль
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        justifyContent="center"
                        className={classes.optionsContainer}
                    >
                        {filterOptions.styles.map((option, i) => {
                            if (
                                option.id === 'designer' &&
                                filter.section === 'wardrobe'
                            ) {
                                return null;
                            }

                            if (i === 0) {
                                return (
                                    <Typography
                                        key={option.id}
                                        variant="body2"
                                        component="span"
                                        className={cn(classes.option, {
                                            [classes.selectedOption]:
                                                filter.style === option.id,
                                        })}
                                        onClick={handleClick(
                                            'style',
                                            option.id
                                        )}
                                    >
                                        {option.title}
                                    </Typography>
                                );
                            }

                            return (
                                <React.Fragment key={option.id}>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        className={classes.dash}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        className={cn(classes.option, {
                                            [classes.selectedOption]:
                                                filter.style === option.id,
                                        })}
                                        onClick={handleClick(
                                            'style',
                                            option.id
                                        )}
                                    >
                                        {option.title}
                                    </Typography>
                                </React.Fragment>
                            );
                        })}
                    </Grid>
                </Grid>
            )}
            {filter.section === 'cupboard' && (
                <Grid item container xs={12} sm={6}>
                    <Grid
                        item
                        container
                        xs={12}
                        justifyContent="center"
                        className={classes.secondOptionsGroup}
                    >
                        <Typography
                            variant="body1"
                            className={classes.subtitle}
                        >
                            Тип открывания дверей
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        justifyContent="center"
                        className={classes.optionsContainer}
                    >
                        {filterOptions.doorTypes.map((option, i) => {
                            if (i !== filterOptions.doorTypes.length - 1) {
                                return (
                                    <React.Fragment key={option.id}>
                                        <Typography
                                            variant="body2"
                                            component="span"
                                            className={cn(classes.option, {
                                                [classes.selectedOption]:
                                                    filter.doorType ===
                                                    option.id,
                                            })}
                                            onClick={handleClick(
                                                'doorType',
                                                option.id
                                            )}
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
                                    className={cn(classes.option, {
                                        [classes.selectedOption]:
                                            filter.doorType === option.id,
                                    })}
                                    onClick={handleClick('doorType', option.id)}
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
