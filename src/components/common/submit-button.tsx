import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { FC } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '45px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
            '& .MuiCircularProgress-colorPrimary': {
                color: theme.palette.primary.main,
            },
        },
        '&:focus': {
            outline: 'none',
            color: theme.palette.primary.main,
            background: 'white',
            '& .MuiCircularProgress-colorPrimary': {
                color: theme.palette.primary.main,
            },
        },
        '& .MuiCircularProgress-colorPrimary': {
            color: 'white',
        },
    },
    [theme.breakpoints.down('xs')]: {
        root: {
            fontSize: '10px',
        },
    },
    '@media (max-width: 991px)': {
        root: {
            height: '40px',
        },
    },
}));

type SubmitButtonProps = {
    loading?: boolean;
};

export const SubmitButton: FC<SubmitButtonProps> = ({ loading, children }) => {
    const classes = useStyles();

    return (
        <button type="submit" className={classes.root}>
            {loading ? <CircularProgress size={20} /> : children}
        </button>
    );
};
