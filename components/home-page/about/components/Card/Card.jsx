import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid, Typography, Hidden } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {},
    row_top: {
        display: 'flex',
        flexDirection: 'row',
        height: '57px',
    },
    title__container: {
        marginLeft: '20px',
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        [theme.breakpoints.down('xs')]: {
            textTransform: 'none',
            fontWeight: '400',
        },
    },
    row_bottom: {
        marginTop: '10px',
    },
    icon: {
        width: '50px',
        height: '50px',
        '& path': {
            fill: theme.palette.primary.main,
        },
        [theme.breakpoints.down('xs')]: {
            width: '35px',
            height: '35px',
        },
    },
    text: {
        fontSize: '15px',
        lineHeight: '17px',
    },
}));

export const Card = ({ Img, title, text }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <>
            <Hidden xsDown>
                <div className={classes.row_top}>
                    <Img className={classes.icon} />
                    <div className={classes.title__container}>
                        <Typography variant={isXsDown ? 'h5' : 'h6'} className={classes.title}>
                            {title}
                        </Typography>
                    </div>
                </div>
                <div className={classes.row_bottom}>
                    <Typography variant="body2" className={classes.text}>
                        {text}
                    </Typography>
                </div>
            </Hidden>
            <Hidden smUp>
                <Grid container alignItems="center">
                    <Grid item xs={2}>
                        <Img className={classes.icon} />
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant={isXsDown ? 'h5' : 'h6'} className={classes.title}>
                            {title}
                        </Typography>
                    </Grid>
                </Grid>
            </Hidden>
        </>
    );
};

Card.propTypes = {
    Img: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};
