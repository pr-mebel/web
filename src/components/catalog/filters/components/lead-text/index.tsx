import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { texts } from './constants';
import { LeadTextProps } from './types';

const useStyles = makeStyles((theme) => ({
    [theme.breakpoints.down('sm')]: {
        root: {
            fontSize: '16px',
            lineHeight: '22px',
        },
    },
}));

export const LeadText: FC<LeadTextProps> = ({ selectedSection }) => {
    const classes = useStyles();
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Typography variant="body1" className={classes.root}>
            {texts[selectedSection][mdUp ? 'large' : 'small']}
        </Typography>
    );
};
