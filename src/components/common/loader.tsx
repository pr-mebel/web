import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    '@keyframes spin': {
        from: {
            transform: 'rotate(0deg)',
        },
        to: {
            transform: 'rotate(360deg)',
        },
    },
    root: {
        height: '300px',
    },
    loader: {
        width: '70px',
        height: '70px',
        borderRadius: '100%',
        position: 'relative',
        margin: '0 auto',

        '&:before, &:after': {
            content: '""',
            width: 'calc(100% - 20px)',
            position: 'absolute',
            height: 'calc(100% - 20px)',
            borderRadius: '100%',
            border: '10px solid transparent',
            borderTopColor: theme.palette.primary.main,
        },
        '&:before': {
            zIndex: '10',
            animation: '$spin 1s infinite',
        },
        '&:after': {
            border: `10px solid ${theme.palette.grey[400]}`,
        },
    },
}));

export const Loader: FC = () => {
    const classes = useStyles();

    return (
        <Grid item xs={12} container justifyContent="center" alignItems="center" className={classes.root}>
            <div className={classes.loader} />
        </Grid>
    );
};
