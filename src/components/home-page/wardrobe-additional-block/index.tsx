import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BlockTitle } from '@/components/common';
import { Typography } from '@material-ui/core';
import { WardrobeAdditionalBlockProps } from './types';

const useStyles = makeStyles({
    text: {
        marginTop: '20px',
    },
});

export const WardrobeAdditionalBlock: FC<WardrobeAdditionalBlockProps> = ({ title, text }) => {
    const classes = useStyles();

    return (
        <>
            <BlockTitle>
                <Typography variant="h5">{title}</Typography>
            </BlockTitle>
            <Typography variant="body2" className={classes.text}>
                {text}
            </Typography>
        </>
    );
};
