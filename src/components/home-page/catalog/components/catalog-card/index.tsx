import React, { FC } from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Hidden } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { LoadingBackground, ImageProgressive } from '@/components';
import { CatalogCardProps } from './types';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        width: '100%',
        background: 'white',
        '&:hover $image': {
            transform: 'scale(1.1)',
        },
        '&:hover $imageContainer:after': {
            background: 'rgba(0,0,0,.3)',
        },
        '&:hover $hoverTextContainer': {
            opacity: 1,
            top: '0',
        },
        '&:hover $caption:after': {
            width: '100%',
        },
        '&:hover $arrow': {
            right: '5px',
        },
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
    imageContainer: {
        width: '100%',
        paddingTop: '66.66%',
        position: 'relative',
        display: 'block',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
        transition: 'all .5s',
        '&:after': {
            position: 'absolute',
            content: '""',
            width: '100%',
            height: '100%',
            top: '0',
            left: '0',
            background: 'rgba(0,0,0,0)',
            transition: 'background .3s',
            zIndex: '20',
        },
        [theme.breakpoints.down('xs')]: {
            '&:after': {
                display: 'none',
            },
        },
    },
    image: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: 10,
        transition: 'transform .5s',
    },
    hoverTextContainer: {
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        opacity: '0',
        position: 'absolute',
        zIndex: 30,
        transition: 'all .3s ease-in-out',
        top: '10%',
        left: '0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: '30px',
        paddingRight: '30px',
        [theme.breakpoints.down('xs')]: {
            paddingLeft: '25px',
            paddingRight: '25px',
        },
    },
    title: {
        textTransform: 'uppercase',
        fontSize: '18px',
        color: 'white',
        fontWeight: 300,
    },
    subtitle: {
        fontFamily: 'PlayfairDisplay, serif',
        fontSize: '18px',
        color: 'white',
        fontStyle: 'italic',
        textTransform: 'lowercase',
    },
    captionContainer: {
        marginTop: '12px',
    },
    caption: {
        position: 'relative',
        textTransform: 'uppercase',
        fontSize: '15px',
        '&:after': {
            position: 'absolute',
            bottom: '0',
            left: '0',
            content: '""',
            width: '0',
            height: '1px',
            background: 'black',
            transition: 'all .3s ease-in-out',
        },
        [theme.breakpoints.down('xs')]: {
            margin: '0',
        },
    },
    captionSm: {
        color: 'white',
        '&:after': {
            background: 'white',
        },
    },
    arrow: {
        position: 'absolute',
        transition: 'all .3s ease-in-out',
        color: 'white',
        width: '30px',
        height: '30px',
        bottom: '5px',
        right: '-30px',
        zIndex: 30,
    },
    imgHeader: {
        height: '40px',
        width: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, .5)',
        zIndex: 30,
    },
}));

export const CatalogCard: FC<CatalogCardProps> = ({ title, subtitle, caption, img, href }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <a href={href} className={classes.link}>
                <Hidden xsDown>
                    <LoadingBackground>
                        <div className={classes.imageContainer}>
                            <ImageProgressive
                                src={img}
                                alt={caption}
                                className={classes.image}
                            />
                            <div className={classes.hoverTextContainer}>
                                <div>
                                    <Typography variant="h5" className={classes.title}>
                                        {title}
                                    </Typography>
                                    <Typography className={classes.subtitle}>{subtitle}</Typography>
                                </div>
                            </div>
                            <ArrowForwardIcon className={classes.arrow} />
                        </div>
                    </LoadingBackground>
                    <div className={classes.captionContainer}>
                        <Typography className={classes.caption} component="span">
                            {caption}
                        </Typography>
                    </div>
                </Hidden>
                <Hidden smUp>
                    <LoadingBackground>
                        <div className={classes.imageContainer}>
                            <ImageProgressive
                                src={img}
                                alt={caption}
                                className={classes.image}
                            />
                            <div className={classes.imgHeader}>
                                <Typography
                                    component="span"
                                    className={cn(classes.caption, classes.captionSm)}
                                >
                                    {caption}
                                </Typography>
                            </div>
                            <ArrowForwardIcon className={classes.arrow} />
                        </div>
                    </LoadingBackground>
                </Hidden>
            </a>
        </div>
    );
};

