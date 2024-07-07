import {
  Button as MUIButton,
  ButtonProps,
  CircularProgress,
} from '@mui/material';
import React, { FC } from 'react';

type Props = ButtonProps & {
  loading?: boolean;
  block?: boolean;
};

export const Button: FC<Props> = ({ block, loading, children, ...props }) => (
  <MUIButton
    {...props}
    sx={(theme) => ({
      height: '45px',
      background: theme.palette.primary.main,
      textAlign: 'center',
      fontSize: '12px',
      fontWeight: 600,
      textTransform: 'uppercase',
      color: 'white',
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: 0,
      transition: 'all .3s ease-in-out',
      cursor: 'pointer',
      width: block ? '100%' : 'auto',
      padding: '1px 6px',
      letterSpacing: 'normal',
      '&:hover': {
        color: theme.palette.primary.main,
        background: 'white',
      },
      '&:focus': {
        outline: 'none',
      },
      '& .progress': {
        color: 'white',
      },
      '&:hover .progress, &:focus .progress': {
        color: theme.palette.primary.main,
      },
      '&:disabled, &:hover&:disabled': {
        color: theme.palette.primary.main,
        background: theme.palette.grey[200],
        cursor: 'auto',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '10px',
      },
      '@media (max-width: 991px)': {
        height: '40px',
      },
    })}
  >
    {loading ? <CircularProgress size={20} className="progress" /> : children}
  </MUIButton>
);
