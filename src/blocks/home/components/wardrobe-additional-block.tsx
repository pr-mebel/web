import { Typography } from '@mui/material';
import React, { FC } from 'react';

import { BlockTitle } from '@/components/common';

type Props = {
  title: string;
  text: string;
};

export const WardrobeAdditionalBlock: FC<Props> = ({ title, text }) => (
  <>
    <BlockTitle>
      <Typography variant="h5">{title}</Typography>
    </BlockTitle>
    <Typography
      variant="body2"
      sx={{
        marginTop: '20px',
      }}
    >
      {text}
    </Typography>
  </>
);
