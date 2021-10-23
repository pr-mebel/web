import React, { FC } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    [theme.breakpoints.down('xs')]: {
        text: {
            fontSize: '14px',
            lineHeight: '16px',
        },
    },
}));

type Props = {
    img: React.ReactNode;
};

export const DesignCard: FC<Props> = ({ img, children }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Grid container alignItems="center" spacing={1} direction={isXsDown ? 'row' : 'column'}>
            <Grid item xs={2} sm={12}>
                {img}
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
