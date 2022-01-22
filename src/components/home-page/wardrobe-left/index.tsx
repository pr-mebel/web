import { Hidden } from '@material-ui/core';
import React, { FC } from 'react';

import { WardrobeLeftMdUp } from './md-up';
import { WardrobeLeftSmDown } from './sm-down';

export const WardrobeLeft: FC = () => (
    <>
        <Hidden mdUp>
            <WardrobeLeftSmDown />
        </Hidden>
        <Hidden smDown>
            <WardrobeLeftMdUp />
        </Hidden>
    </>
);
