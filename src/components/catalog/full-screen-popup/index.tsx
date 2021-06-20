import React, { FC, useState, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { Loader } from '@/components/common';
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

    /**
     * Выставялет флаг isLoading в false, после того как картинка загрузится
     */
    const handleSetLoaded = useCallback(() => {
        setIsLoading(false);
    }, []);

    /**
     * Выставляет флаг isLoading на true при изначальной отрисовке
     */
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
            {isLoading ? (
                <div>
                    <Loader />
                </div>
            ) : (
                <>
                    <ClearIcon className={classes.closeIcon} onClick={onClose} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        className={classes.img}
                        src={img}
                        alt="Товар"
                        onLoad={handleSetLoaded}
                    />
                </>
            )}
        </Dialog>
    );
};
