import { makeStyles } from '@material-ui/core/styles';
import React, { FC } from 'react';

const useStyles = makeStyles({
    root: {
        width: '350px',
        margin: 'auto',
        '@media (max-width: 991px)': {
            width: '330px',
        },
        '@media (max-width: 767px)': {
            width: '300px',
        },
        '@media (max-width: 480px)': {
            width: '250px',
        },
    },
});

export const ButtonContainer: FC = ({ children }) => {
    const classes = useStyles();

    return <div className={classes.root}>{children}</div>;
};
