import React, { FC } from 'react';
import { Hidden } from '@material-ui/core';
import { WardrobeRightSmDown } from './sm-down';
import { WardrobeRightMdUp } from './md-up';

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
