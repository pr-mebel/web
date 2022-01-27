import { Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Clear as ClearIcon } from '@material-ui/icons';
import cn from 'classnames';
import Image from 'next/image';
import React, { FC, memo, MouseEventHandler, useState } from 'react';

import { Image as ImageType } from '@/entities';

const useStyles = makeStyles(() => ({
    paperRoot: {
        position: 'relative',
        background: 'rgba(0, 0, 0, 0)',
    },
    closeIcon: {
        cursor: 'pointer',
        width: '30px',
        height: '30px',
        top: '5px',
        right: '5px',
        position: 'absolute',
        zIndex: 10,
        background: 'rgba(255, 255, 255, 0.4)',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        opacity: 0,
        transition: 'all .3s ease-in',
    },
    imageContainerVisible: {
        opacity: 1,
    },
}));

type Props = {
    isOpen: boolean;
    image: ImageType;
    onClose: MouseEventHandler<SVGSVGElement>;
};

const FullscreenCardPopupComponent: FC<Props> = ({ image, isOpen, onClose }) => {
    const classes = useStyles();
    const [loaded, setLoaded] = useState(false);

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="xl"
            PaperProps={{
                className: classes.paperRoot,
            }}
        >
            <ClearIcon className={classes.closeIcon} onClick={onClose} />
            <div
                className={cn(classes.imageContainer, {
                    [classes.imageContainerVisible]: loaded,
                })}
            >
                <Image
                    src={image.url}
                    width={image.width}
                    height={image.height}
                    className={classes.image}
                    alt={image.title}
                    onLoadingComplete={() => setLoaded(true)}
                />
            </div>
        </Dialog>
    );
};

export const FullscreenCardPopup = memo(FullscreenCardPopupComponent);
