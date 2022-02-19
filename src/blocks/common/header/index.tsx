import { useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';

import { DesktopHeader } from './layouts/desktop';
import { MobileHeader } from './layouts/mobile';

export const Header: FC = () => {
    const theme = useTheme();
    const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));

    if (isLgDown) {
        return <MobileHeader />;
    }

    return <DesktopHeader />;
};
