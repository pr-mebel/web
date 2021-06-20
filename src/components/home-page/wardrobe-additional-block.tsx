import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BlockTitle } from '@/components/common';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    text: {
        marginTop: '20px',
    },
});

type WardrobeAdditionalBlockProps = {
    title: string;
    text: string;
};

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
