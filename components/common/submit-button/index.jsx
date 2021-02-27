import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        lineHeight: '45px',
        background: theme.palette.primary.main,
        textAlign: 'center',
        fontSize: '12px',
        fontWeight: '600',
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

export const SubmitButton = ({ children }) => {
    const classes = useStyles();

    return (
        <button type="submit" className={classes.root}>
            {children}
        </button>
    );
};

SubmitButton.propTypes = {
    children: PropTypes.node.isRequired,
};
