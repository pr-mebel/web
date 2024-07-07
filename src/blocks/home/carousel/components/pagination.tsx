import { Box, Typography } from '@mui/material';
import clsx from 'clsx';
import React, { FC } from 'react';

type Props = {
  numberOfPages: number;
  currentPage: number;
  onChangeSlide: (arg0: number) => void;
};

export const Pagination: FC<Props> = ({
  currentPage,
  numberOfPages,
  onChangeSlide,
}) => (
  <Box
    sx={{
      position: 'relative',
      zIndex: 10,
      display: 'flex',
      '& .item': {
        width: '50px',
        height: '50px',
        background: 'none',
        border: 'none',
        color: 'white',
        display: 'flex',
        padding: '0',
        justifyContent: 'center',
        alignItems: 'center',
        '&:focus': {
          outline: 'none',
        },
        '@media (max-width: 768px)': {
          width: '36px',
          height: '36px',
        },
      },
      '& .active': {
        position: 'relative',
        '&:after': {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          content: '""',
          borderRadius: '50%',
          border: 'solid 2px white',
        },
      },
    }}
  >
    {Array.from({ length: numberOfPages }).map((_, index) => (
      <button
        key={index}
        type="button"
        className={clsx('item', {
          active: currentPage === index,
        })}
        onClick={() => onChangeSlide(index)}
      >
        <Typography
          sx={{
            color: 'inherit',
            cursor: 'pointer',
          }}
        >
          {index + 1}
        </Typography>
      </button>
    ))}
  </Box>
);
