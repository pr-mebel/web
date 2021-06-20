import React, { FC } from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    '@keyframes pulse': {
        '0%': {
            backgroundColor: theme.palette.grey[200],
        },
        '30%': {
            backgroundColor: theme.palette.grey[300],
        },
        '100%': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.grey[200],
        animation: '$pulse 1s infinite ease-in-out',
    },
}));

type Props = {
    className?: string;
};

export const LoadingBackground: FC<Props> = ({ children, className }) => {
    const classes = useStyles();

    return <div className={cn(classes.root, className)}>{children}</div>;
};
