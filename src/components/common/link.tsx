import React, { FC } from 'react';
import { noop } from 'lodash';
import cn from 'classnames';
import NextLink from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        textDecoration: 'none',
        cursor: 'pointer',
        color: 'inherit',
        transition: 'color .2s',
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
}));

type Props = {
    to?: string;
    external?: boolean;
    asButton?: boolean;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLSpanElement>;
};

export const Link: FC<Props> = ({
    to = '/',
    external,
    asButton,
    children,
    className = '',
    onClick = noop,
}) => {
    const classes = useStyles();

    if (asButton) {
        return (
            <Typography
                component="a"
                className={cn(classes.root, className)}
                onClick={onClick}
            >
                {children}
            </Typography>
        );
    }

    if (external) {
        return (
            <a
                href={to}
                className={cn(classes.root, className)}
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
        );
    }

    return (
        <NextLink passHref href={to}>
            <span className={cn(classes.root, className)}>{children}</span>
        </NextLink>
    );
};
