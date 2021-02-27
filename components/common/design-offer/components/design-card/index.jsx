import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    img: {
        width: '70px',
        height: '70px',
        '& path': {
            fill: theme.palette.primary.main,
        },
    },
    [theme.breakpoints.down('xs')]: {
        img: {
            width: '45px',
            height: '45px',
        },
        text: {
            fontSize: '14px',
            lineHeight: '16px',
        },
    },
    '@media (max-width: 400px)': {
        img: {
            width: '35px',
            height: '35px',
        },
    },
}));

export const DesignCard = ({ Img, children }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Grid container alignItems="center" spacing={1} direction={isXsDown ? 'row' : 'column'}>
            <Grid item xs={2} sm={12} align="center">
                <Img className={classes.img} />
            </Grid>
            <Grid item xs={10} sm={12}>
                <Typography
                    className={classes.text}
                    variant="body2"
                    align={isXsDown ? 'left' : 'center'}
                >
                    {children}
                </Typography>
            </Grid>
        </Grid>
    );
};

DesignCard.propTypes = {
    Img: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};
