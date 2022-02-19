import { useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';

import { Desktop } from './layouts/desktop';
import { Mobile } from './layouts/mobile';

export const CallDesigner: FC = () => {
    const theme = useTheme();
    const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

    if (isSmDown) {
        return <Mobile />;
    }

    return <Desktop />;
};
