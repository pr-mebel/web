import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import React, { FC } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        marginBottom: '11px',
        '&:after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            left: '0',
            bottom: '-2px',
            width: '65px',
            height: '1px',
            background: theme.palette.primary.main,
        },
    },
    [theme.breakpoints.down('sm')]: {
        root: {
            fontSize: '22px',
            lineHeight: '25px',
        },
    },
}));

type Props = {
    className?: string;
};

export const BlockTitle: FC<Props> = ({ className, children }) => {
    const classes = useStyles();

    return <div className={cn(classes.root, className)}>{children}</div>;
};
