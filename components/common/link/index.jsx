import React from 'react';
import PropTypes from 'prop-types';
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

export const Link = ({
  to,
  external,
  asButton,
  children,
  className,
  onClick,
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
    <NextLink href={to} className={cn(classes.root, className)}>{children}</NextLink>
  );
};

Link.propTypes = {
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  external: PropTypes.bool,
  className: PropTypes.string,
  asButton: PropTypes.bool,
  onClick: PropTypes.func,
};

Link.defaultProps = {
  external: false,
  asButton: false,
  className: '',
  to: '/',
  onClick: () => ({}),
};
