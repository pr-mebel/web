import React, { FC, useState, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Loader } from '@/components/common';
import { Dialog } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { FullScreenPopupProps } from './types';

const useStyles = makeStyles(() => ({
    img: {
        width: '100%',
        height: '100%',
        opacity: '1',
        objectFit: 'cover',
        transition: 'opacity .5s ease-out',
    },
    paperRoot: {
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
        minWidth: '100px',
        background: 'rgba(0, 0, 0, 0)',
        boxShadow: 'none',
        minHeight: '100px',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeIcon: {
        cursor: 'pointer',
        width: '30px',
        height: '30px',
        top: '5px',
        right: '5px',
        position: 'absolute',
        zIndex: 10,
    },
}));

export const FullScreenPopup: FC<FullScreenPopupProps> = ({ img, isOpen, onClose }) => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);

    const handleSetLoaded = useCallback(() => {
        setIsLoading(false);
    }, []);

    useEffect(() => {
        setIsLoading(true);
    }, [img]);

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            fullWidth
            maxWidth="lg"
            PaperProps={{
                className: classes.paperRoot,
            }}
        >
            <ClearIcon className={classes.closeIcon} onClick={onClose} />
            {isLoading && (
                <div>
                    <Loader />
                </div>
            )}
            <img className={classes.img} src={img} alt="Товар" onLoad={handleSetLoaded} />
        </Dialog>
    );
};
