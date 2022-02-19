import { Grid, GridProps, Typography, TypographyProps } from '@mui/material';
import clsx from 'clsx';
import React, { FC, useCallback } from 'react';

import { filters as filterOptions } from '@/constants';
import { DoorTypeID, FilterField, FilterValue, SectionID, StyleID } from '@/entities';

const Subtitle = ({ children, ...rest }: TypographyProps) => (
    <Typography
        {...rest}
        variant="body1"
        sx={{
            fontSize: '14px',
            fontWeight: 600,
            textTransform: 'uppercase',
        }}
    >
        {children}
    </Typography>
);

const OptionsContainer = ({ children, ...rest }: GridProps) => (
    <Grid
        {...rest}
        item
        container
        xs={12}
        justifyContent="center"
        sx={(theme) => ({
            marginTop: '10px',
            '& .option': {
                display: 'inline-block',
                fontSize: '14px',
                color: theme.palette.grey[500],
                cursor: 'pointer',
            },
            '& .selectedOption': {
                cursor: 'default',
                color: theme.palette.primary.main,
            },
            '& .dash': {
                margin: '0 10px',
            },
            [theme.breakpoints.down('lg')]: {
                '& .dash': {
                    display: 'none',
                },
                '& .option': {
                    padding: '0 7px',
                },
            },
        })}
    >
        {children}
    </Grid>
);

type Props = {
    filter: {
        section: SectionID;
        style: StyleID;
        doorType: DoorTypeID;
    };
    onChange: (arg0: { name: FilterField; value: FilterValue }) => void;
};

export const BottomFilters: FC<Props> = ({ filter, onChange }) => {
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
            {!(filter.section === 'accessories' || filter.section === 'lightingSystems') && (
                <Grid item container xs={12} sm={filter.section === 'cupboard' ? 6 : 12}>
                    <Grid item container xs={12} justifyContent="center">
                        <Subtitle>Стиль</Subtitle>
                    </Grid>
                    <OptionsContainer>
                        {filterOptions.styles.map((option, i) => {
                            if (option.id === 'designer' && filter.section === 'wardrobe') {
                                return null;
                            }

                            if (i === 0) {
                                return (
                                    <Typography
                                        key={option.id}
                                        variant="body2"
                                        component="span"
                                        className={clsx('option', {
                                            selectedOption: filter.style === option.id,
                                        })}
                                        onClick={handleClick('style', option.id)}
                                    >
                                        {option.title}
                                    </Typography>
                                );
                            }

                            return (
                                <React.Fragment key={option.id}>
                                    <Typography variant="body2" component="span" className="dash">
                                        -
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        className={clsx('option', {
                                            selectedOption: filter.style === option.id,
                                        })}
                                        onClick={handleClick('style', option.id)}
                                    >
                                        {option.title}
                                    </Typography>
                                </React.Fragment>
                            );
                        })}
                    </OptionsContainer>
                </Grid>
            )}
            {filter.section === 'cupboard' && (
                <Grid item container xs={12} sm={6}>
                    <Grid
                        item
                        container
                        xs={12}
                        justifyContent="center"
                        sx={(theme) => ({
                            [theme.breakpoints.down('sm')]: {
                                marginTop: '20px',
                            },
                        })}
                    >
                        <Subtitle>Тип открывания дверей</Subtitle>
                    </Grid>
                    <OptionsContainer>
                        {filterOptions.doorTypes.map((option, i) => {
                            if (i !== filterOptions.doorTypes.length - 1) {
                                return (
                                    <React.Fragment key={option.id}>
                                        <Typography
                                            variant="body2"
                                            component="span"
                                            className={clsx('option', {
                                                selectedOption: filter.doorType === option.id,
                                            })}
                                            onClick={handleClick('doorType', option.id)}
                                        >
                                            {option.title}
                                        </Typography>
                                        <Typography variant="body2" component="span" className="dash">
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
                                    className={clsx('option', {
                                        selectedOption: filter.doorType === option.id,
                                    })}
                                    onClick={handleClick('doorType', option.id)}
                                >
                                    {option.title}
                                </Typography>
                            );
                        })}
                    </OptionsContainer>
                </Grid>
            )}
        </Grid>
    );
};
