import React, { FC } from 'react';
import { Hidden } from '@material-ui/core';
import { WardrobeLeftSmDown } from './sm-down';
import { WardrobeLeftMdUp } from './md-up';

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
