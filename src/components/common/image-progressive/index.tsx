import React, { FC, useCallback, useState } from 'react';
import { noop } from 'lodash';
import Image from 'next/image';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { ImageProgressiveProps } from './types';

const useStyles = makeStyles((theme) => ({
    '@keyframes unblur': {
        from: {
            filter: 'blur(5px)'
        },
        to: {
            filter: 'blur(0)',
        },
    },
    root: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
    },
    unloaded: {
        filter: 'blur(5px)',

        '& $realImage': {
            opacity: '0',
        },
    },
    loaded: {
        animation: '$unblur 1s linear',
        filter: 'blur'
    },
    realImage: {
        opacity: 1,
    }
}));

export const ImageProgressive: FC<ImageProgressiveProps> = ({
    src,
    alt,
    quality = 100,
    className,
    onMinImageLoad = noop,
    onClick = noop,
}) => {
    const classes = useStyles();

    const [loaded, setLoaded] = useState(false);

    const handleLoad = useCallback(() => {
        setLoaded(true);
    }, []);

    return (
        <div
            className={cn(classes.root, {
                [classes.unloaded]: !loaded,
                [classes.loaded]: loaded
            })}
            onClick={onClick}
        >
            <Image
                src={src}
                alt={alt}
                quality={1}
                objectFit="cover"
                layout="fill"
                className={cn(className)}
                onLoad={onMinImageLoad}
            />
            <Image
                src={src}
                alt={alt}
                quality={quality}
                objectFit="cover"
                layout="fill"
                className={cn(className, classes.realImage)}
                onLoad={handleLoad}
            />
        </div>
    )
}