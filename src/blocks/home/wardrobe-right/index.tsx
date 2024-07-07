import { useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';

import { Desktop } from './layouts/desktop';
import { Mobile } from './layouts/mobile';

export const WardrobeRight: FC = () => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  if (isMdDown) {
    return <Mobile />;
  }

  return <Desktop />;
};
