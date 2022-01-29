import { Hidden } from '@material-ui/core';
import React, { FC } from 'react';

import { WardrobeRightMdUp } from './md-up';
import { WardrobeRightSmDown } from './sm-down';

export const WardrobeRight: FC = () => (
    <>
        <Hidden mdUp>
            <WardrobeRightSmDown />
        </Hidden>
        <Hidden smDown>
            <WardrobeRightMdUp />
        </Hidden>
    </>
);
