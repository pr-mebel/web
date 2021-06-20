import React, { FC } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid, Typography, Hidden } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    rowTop: {
        display: 'flex',
        flexDirection: 'row',
        height: '57px',
    },
    titleContainer: {
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
    rowBottom: {
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

type CardProps = {
    Img: React.FC<{ className: string }>;
    title: string;
    text: string;
};


export const Card: FC<CardProps> = ({ Img, title, text }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <>
            <Hidden xsDown>
                <div className={classes.rowTop}>
                    <Img className={classes.icon} />
                    <div className={classes.titleContainer}>
                        <Typography variant={isXsDown ? 'h5' : 'h6'} className={classes.title}>
                            {title}
                        </Typography>
                    </div>
                </div>
                <div className={classes.rowBottom}>
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
