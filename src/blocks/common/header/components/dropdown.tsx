import { SvgIcon } from '@mui/material';
import React, { FC } from 'react';

export const Dropdown: FC = () => (
  <SvgIcon
    sx={{
      width: '6px',
      height: 'auto',
      transform: 'rotate(-90deg)',
    }}
    viewBox="0 0 14 24"
  >
    <path
      d="M11.857 23.448a.807.807 0 0 0 .585.242.827.827 0 0 0 .585-1.41L2.746 12l10.28-10.28a.827.827 0 0 0-1.17-1.168L.994 11.416a.827.827 0 0 0 0 1.168l10.863 10.864z"
      fill="#EB2F46"
    />
  </SvgIcon>
);
