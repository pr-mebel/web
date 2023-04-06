import { Box, Skeleton, SvgIcon, Typography } from '@mui/material';
import clsx from 'clsx';
import Image from 'next/legacy/image';
import React, { FC, useCallback, useState } from 'react';

type Props = {
    imageUrlMin: string;
    collection: string;
    currentItemId: number;
    onClick: (arg0: number) => void;
};

export const Card: FC<Props> = ({ imageUrlMin, collection, currentItemId, onClick }) => {
    const [loaded, setLoaded] = useState(false);
    const handleClick = useCallback(() => {
        onClick(currentItemId);
    }, [onClick, currentItemId]);

    return (
        <Box
            sx={(theme) => ({
                paddingTop: '66.66%',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                [theme.breakpoints.up('sm')]: {
                    '&:hover .tooltip': {
                        transform: 'translateY(0)',
                    },
                    '&:hover .image': {
                        transform: 'scale(1.1)',
                    },
                    '&:hover': {
                        '&::after': {
                            background: 'rgba(0, 0, 0, .3)',
                        },
                    },
                    '&::after': {
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        content: '""',
                        zIndex: '20',
                        position: 'absolute',
                        background: 'rgba(0,0,0,0)',
                        transition: 'background .3s',
                    },
                },
                '& .image': {
                    opacity: 0,
                    transition: 'all .3s',
                },
                '& .imageLoaded': {
                    opacity: 1,
                },
            })}
            onClick={handleClick}
        >
            <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                }}
            />
            <Image
                layout="fill"
                objectFit="cover"
                className={clsx('image', {
                    imageLoaded: loaded,
                })}
                src={imageUrlMin}
                alt={`Товар из коллекции ${collection}`}
                onLoad={() => setLoaded(true)}
            />
            <Box
                className="tooltip"
                sx={{
                    transform: 'translateY(100%)',
                    transition: 'transform .2s ease-out',
                    position: 'absolute',
                    zIndex: 30,
                    bottom: '0',
                    left: '0',
                    padding: '5px 40px 5px 15px',
                    backgroundColor: 'rgba(119, 119, 119, 0.72)',
                    '&:after': {
                        position: 'absolute',
                        right: '25px',
                        height: '100%',
                        content: '""',
                        top: '0',
                        width: '.5px',
                        background: 'white',
                    },
                }}
            >
                <Typography
                    sx={{
                        color: 'white',
                        fontSize: '12px',
                    }}
                >
                    {collection}
                </Typography>
                <SvgIcon
                    xmlns="http://www.w3.org/2000/svg"
                    sx={{
                        position: 'absolute',
                        color: 'white',
                        width: '12px',
                        height: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        right: '5px',
                    }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </SvgIcon>
            </Box>
        </Box>
    );
};
