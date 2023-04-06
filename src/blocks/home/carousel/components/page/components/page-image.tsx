import { useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/legacy/image';
import React, { FC } from 'react';

import { imageMapping } from './image-mapping';

type Props = {
    pageID: number;
};

export const PageImage: FC<Props> = ({ pageID }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md')) && !isMobile;

    const currentImage = imageMapping[pageID];

    if (isMobile) {
        return (
            <Image
                src={currentImage.mobile.img}
                alt={currentImage.alt}
                layout="fill"
                placeholder="blur"
                quality={currentImage.mobile.quality}
            />
        );
    }

    if (isTablet) {
        return (
            <Image
                src={currentImage.tablet.img}
                alt={currentImage.alt}
                layout="fill"
                placeholder="blur"
                quality={currentImage.tablet.quality}
            />
        );
    }

    return (
        <Image
            src={currentImage.desktop.img}
            alt={currentImage.alt}
            layout="fill"
            placeholder="blur"
            quality={currentImage.desktop.quality}
        />
    );
};
