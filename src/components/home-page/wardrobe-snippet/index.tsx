import React, { FC, useState, useCallback, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BlockTitle } from '@/components/common';
import Image from 'next/image';
import { Typography, Popover } from '@material-ui/core';
import { WardrobeSnipperProps } from './types';

const useStyles = makeStyles(() => ({
    '@keyframes pulse': {
        '40%': {
            boxShadow: '0 0 0 0 rgba(255, 0, 0, .7)',
        },
        '80%': {
            boxShadow: '0 0 0 10px rgba(255, 0, 0, 0)',
        },
        '100%': {
            boxShadow: '0 0 0 10px rgba(255, 0, 0, 0)',
        },
    },
    circle: {
        width: '15px',
        height: '15px',
        background: '#b0a3a3',
        border: '2px solid white',
        borderRadius: '50%',
        position: 'relative',
        animation: '$pulse 2s infinite',
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        width: '310px',
    },
    paperContainer: {
        position: 'relative',
        zIndex: 1500,
    },
    container: {
        marginTop: '10px',
        padding: '6px',
        boxSizing: 'border-box',
    },
    title: {
        fontSize: '16px',
        lineHeight: '18px',
    },
    text: {
        marginTop: '10px',
        fontSize: '16px',
        lineHeight: '1.3',
    },
    img: {
        width: '310px',
        height: '310px',
    },
}));

export const WardrobeSnippet: FC<WardrobeSnipperProps> = ({ title, text, img, direction }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    /**
     * Открывает сниппет
     */
    const handleOpen = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    /**
     * Закрывает сниппет
     */
    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const open = useMemo(() => !!anchorEl, [anchorEl]);

    return (
        <div onMouseEnter={handleOpen} onMouseLeave={handleClose}>
            <div
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                className={classes.circle}
            />
            <Popover
                id="mouse-over-popover"
                open={open}
                className={classes.popover}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: direction as number | 'left' | 'right' | 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: direction === 'right' ? 'left' : 'right',
                }}
                PaperProps={{
                    className: classes.paper,
                }}
                onClose={handleClose}
            >
                <div className={classes.paperContainer}>
                    <Image src={img} alt={title} width={310} height={310} quality={100} />
                    <div className={classes.container}>
                        <BlockTitle>
                            <Typography variant="h5" className={classes.title}>
                                {title}
                            </Typography>
                        </BlockTitle>
                        <Typography variant="body2" className={classes.text}>
                            {text}
                        </Typography>
                    </div>
                </div>
            </Popover>
        </div>
    );
};
