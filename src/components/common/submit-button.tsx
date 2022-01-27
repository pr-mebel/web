import { makeStyles } from '@material-ui/core/styles';
import React, { FC } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        lineHeight: '43px',
        paddingTop: '0',
        paddingBottom: '0',
        background: theme.palette.primary.main,
        textAlign: 'center',
        fontSize: '12px',
        fontWeight: 600,
        textTransform: 'uppercase',
        color: 'white',
        border: `1px solid ${theme.palette.primary.main}`,
        transition: 'all .3s ease-in-out',
        cursor: 'pointer',
        width: '100%',
        '&:hover': {
            color: theme.palette.primary.main,
            background: 'white',
        },
        '&:focus': {
            outline: 'none',
        },
    },
    [theme.breakpoints.down('xs')]: {
        root: {
            fontSize: '10px',
        },
    },
}));

export const SubmitButton: FC = ({ children }) => {
    const classes = useStyles();

    return (
        <button type="submit" className={classes.root}>
            {children}
        </button>
    );
};
