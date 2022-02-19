import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, styled, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';

import { CardImage } from './card-image';

const Root = styled('div')(({ theme }) => ({
    position: 'relative',
    width: '100%',
    background: 'white',
    '& .link': {
        textDecoration: 'none',
        color: 'inherit',
    },
    '& .image': {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: 10,
        transition: 'all .5s',
    },
    '&:hover .image': {
        transform: 'scale(1.1)',
    },
    '& .imageContainer': {
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
        [theme.breakpoints.down('sm')]: {
            '&:after': {
                display: 'none',
            },
        },
    },
    '&:hover .imageContainer:after': {
        background: 'rgba(0,0,0,.5)',
    },
    '& .hoverTextContainer': {
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
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '25px',
            paddingRight: '25px',
        },
    },
    '&:hover .hoverTextContainer': {
        opacity: 1,
        top: '0',
    },
    '& .caption': {
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
        [theme.breakpoints.down('sm')]: {
            margin: '0',
            color: 'white',
            '&:after': {
                background: 'white',
            },
        },
    },
    '&:hover .caption:after': {
        width: '100%',
    },
    '& .arrow': {
        position: 'absolute',
        transition: 'all .3s ease-in-out',
        color: 'white',
        width: '30px',
        height: '30px',
        bottom: '5px',
        right: '-30px',
        zIndex: 30,
    },
    '&:hover .arrow': {
        right: '5px',
    },
    [theme.breakpoints.down('md')]: {
        '&:hover .caption:after': {
            display: 'none',
        },
        '&:hover .hoverTextContainer': {
            display: 'none',
        },
        '&:hover .image': {
            transform: 'unset',
        },
    },
}));

type Props = {
    cardID: number;
    title: string;
    subtitle: string;
    caption: string;
    href: string;
};

export const CatalogCard: FC<Props> = ({ cardID, title, subtitle, caption, href }) => {
    const theme = useTheme();
    const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

    if (isSmDown) {
        return (
            <Root>
                <a href={href} className="link">
                    <div className="imageContainer">
                        <div className="image">
                            <CardImage id={cardID} />
                        </div>
                        <Box
                            sx={{
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
                            }}
                        >
                            <Typography component="span" className="caption">
                                {caption}
                            </Typography>
                        </Box>
                    </div>
                </a>
            </Root>
        );
    }

    return (
        <Root>
            <a href={href} className="link">
                <div className="imageContainer">
                    <div className="image">
                        <CardImage id={cardID} />
                    </div>
                    <div className="hoverTextContainer">
                        <div>
                            <Typography
                                variant="h5"
                                sx={{
                                    textTransform: 'uppercase',
                                    fontSize: '18px',
                                    color: 'white',
                                    fontWeight: 400,
                                }}
                            >
                                {title}
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: 'PlayfairDisplay, serif',
                                    fontSize: '18px',
                                    color: 'white',
                                    fontStyle: 'italic',
                                    textTransform: 'lowercase',
                                    fontWeight: 600,
                                }}
                            >
                                {subtitle}
                            </Typography>
                        </div>
                    </div>
                    <ArrowForwardIcon className="arrow" />
                </div>
                <Box
                    sx={{
                        marginTop: '12px',
                    }}
                >
                    <Typography className="caption" component="span">
                        {caption}
                    </Typography>
                </Box>
            </a>
        </Root>
    );
};
