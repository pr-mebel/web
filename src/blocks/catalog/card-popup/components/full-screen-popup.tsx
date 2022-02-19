import ClearIcon from '@mui/icons-material/Clear';
import { Dialog } from '@mui/material';
import React, { FC, MouseEventHandler, useMemo } from 'react';

import { Image as ImageType } from '@/entities';

type Props = {
    isOpen: boolean;
    image: ImageType;
    onClose: MouseEventHandler<SVGSVGElement>;
};

export const FullscreenCardPopup: FC<Props> = ({ image, isOpen, onClose }) => {
    const { width, height } = useMemo(() => {
        const padding = 32;
        const windowWidth = window.innerWidth - padding > 1920 ? 1920 : window.innerWidth - padding;
        const windowHeight = window.innerHeight - padding;
        const windowAspectRatio = windowWidth / windowHeight;
        const imageAspectRatio = image.width / image.height;

        if (imageAspectRatio <= windowAspectRatio) {
            console.log('here');
            return {
                height: `${windowHeight}px`,
                width: `${windowHeight * imageAspectRatio}px`,
            };
        }

        return {
            width: `${windowWidth}px`,
            height: `${windowWidth / imageAspectRatio}px`,
        };
    }, [image.width, image.height]);

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth={false}
            PaperProps={{
                sx: {
                    position: 'relative',
                    background: 'rgba(0, 0, 0, 0)',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: isOpen ? `url(${image.url})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width,
                    height,
                },
            }}
        >
            <ClearIcon
                sx={{
                    cursor: 'pointer',
                    width: '30px',
                    height: '30px',
                    top: '5px',
                    right: '5px',
                    position: 'absolute',
                    zIndex: 10,
                    background: 'rgba(255, 255, 255, 0.4)',
                }}
                onClick={onClose}
            />
        </Dialog>
    );
};
