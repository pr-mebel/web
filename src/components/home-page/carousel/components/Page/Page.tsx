import React, { FC } from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { PageImage } from './components';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    imageContainer: {
        position: 'absolute',
        objectPosition: 'center',
        backgroundColor: 'grey',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
    },
    pageContent: {
        position: 'relative',
        padding: '0',
        width: '1140px',
        zIndex: 10,
        boxSizing: 'border-box',
    },
    text: {
        color: 'white',
    },
    title: {
        fontFamily: 'PlayfairDisplay Italic, serif',
        fontSize: '7.4vh',
        lineHeight: '1.1',
        letterSpacing: '2px',
        '&:last-of-type': {
            marginBottom: '15px',
        },
    },
    subtitle: {
        '&:last-of-type': {
            marginBottom: '20px',
        },
        fontFamily: 'PlayfairDisplay Italic, serif',
        fontSize: '4.6vh',
        letterSpacing: '2px',
        lineHeight: '1',
    },
    bottomText: {
        fontSize: '2.8vh',
        lineHeight: '1.3',
    },
    button: {
        padding: '15px 50px',
        textTransform: 'capitalize',
        borderRadius: '50px',
        background: 'none',
        color: 'white',
        cursor: 'pointer',
        transition: 'border .2s',
        border: 'solid 2px white',
        '&:hover': {
            border: `solid 2px ${theme.palette.primary.main}`,
        },
        '&:focus': {
            outline: 'none',
        },
    },
    buttonText: {
        textTransform: 'capitalize',
    },
    buttonContainer: {
        marginTop: '60px',
    },

    '@media (max-width: 1250px)': {
        pageContent: {
            width: '930px',
        },
    },

    '@media (max-width: 990px)': {
        pageContent: {
            width: '690px',
        },
        title: {
            fontSize: '72px',
            lineHeight: '68px',
        },
        subtitle: {
            fontSize: '45px',
        },
        bottomText: {
            fontSize: '25px',
        },
        button: {
            padding: '10px 35px',
        },
        buttonText: {
            fontSize: '16px',
        },
    },

    '@media (max-width: 768px)': {
        pageContent: {
            width: '510px',
        },
        title: {
            fontSize: '65px',
            lineHeight: '62px',
        },
        subtitle: {
            fontSize: '38px',
        },
        bottomText: {
            fontSize: '20px',
        },
    },

    '@media (max-width: 550px)': {
        pageContent: {
            width: '100%',
            padding: '15px',
        },
        title: {
            fontSize: '42px',
            lineHeight: '38px',
        },
        subtitle: {
            fontSize: '28px',
        },
        bottomText: {
            fontSize: '16px',
        },
        button: {
            padding: '7px 25px',
        },
        buttonText: {
            fontSize: '12px',
        },
    },

    '@media (max-width: 375px)': {
        title: {
            fontSize: '40px',
        },
        subtitle: {
            fontSize: '24px',
        },
    },
}));

type Texts = {
    id: string;
    data: string;
};

export type PageProps = {
    pageID: number;
    titles: Texts[];
    subtitles?: Texts[];
    texts: Texts[];
    to: string;
};

export const Page: FC<PageProps> = ({ pageID, titles, subtitles, texts, to }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.imageContainer}>
                <PageImage pageID={pageID} />
            </div>

            <div className={classes.pageContent}>
                {titles.map((titleWrapper) => (
                    <Typography key={titleWrapper.id} className={cn(classes.text, classes.title)}>
                        {titleWrapper.data}
                    </Typography>
                ))}
                <div>
                    {subtitles?.map((subtitleWrapper) => (
                        <Typography
                            key={subtitleWrapper.id}
                            className={cn(classes.text, classes.subtitle)}
                        >
                            {subtitleWrapper.data}
                        </Typography>
                    ))}
                </div>
                <div>
                    {texts.map((textWrapper) => (
                        <Typography
                            key={textWrapper.id}
                            className={cn(classes.text, classes.bottomText)}
                        >
                            {textWrapper.data}
                        </Typography>
                    ))}
                </div>
                <div className={classes.buttonContainer}>
                    <Link href={to}>
                        <button type="button" className={classes.button}>
                            <Typography className={classes.buttonText}>Подробнее</Typography>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
