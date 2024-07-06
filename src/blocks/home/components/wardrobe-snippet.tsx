import { Box, Popover, Typography } from '@mui/material';
import Image from 'next/legacy/image';
import React, { FC, MouseEvent, useState } from 'react';

import { BlockTitle } from '@/components/common';
import { useModal } from '@/hooks';

type Props = {
    title: string;
    text: string;
    img: string;
    direction: string;
    onBeforeOpen?: () => void;
};

export const WardrobeSnippet: FC<Props> = ({ title, text, img, direction, onBeforeOpen }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const popup = useModal({
        onOpen: (event: MouseEvent<HTMLDivElement>) => {
            onBeforeOpen?.();
            setAnchorEl(event.currentTarget);
        },
        onClose: () => {
            setAnchorEl(null);
        },
    });

    return (
        <div onMouseEnter={popup.handleOpen} onMouseLeave={popup.handleClose}>
            <Box
                sx={{
                    width: '15px',
                    height: '15px',
                    background: '#b0a3a3',
                    border: '2px solid white',
                    borderRadius: '50%',
                    position: 'relative',
                    animation: '$pulse 2s infinite',
                }}
            />
            <Popover
                id="mouse-over-popover"
                open={popup.isOpen}
                sx={{
                    pointerEvents: 'none',
                }}
                anchorEl={anchorEl}
                disableRestoreFocus
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: direction as number | 'left' | 'right' | 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: direction === 'right' ? 'left' : 'right',
                }}
                PaperProps={{
                    sx: {
                        width: '310px',
                    },
                }}
                onClose={popup.handleClose}
            >
                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 1500,
                    }}
                >
                    <Image src={img} alt={title} width={310} height={310} quality={100} />
                    <Box
                        sx={{
                            marginTop: '10px',
                            padding: '6px',
                            boxSizing: 'border-box',
                        }}
                    >
                        <BlockTitle>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontSize: '16px',
                                    lineHeight: '18px',
                                }}
                            >
                                {title}
                            </Typography>
                        </BlockTitle>
                        <Typography
                            variant="body2"
                            sx={{
                                marginTop: '10px',
                                fontSize: '16px',
                                lineHeight: '1.3',
                            }}
                        >
                            {text}
                        </Typography>
                    </Box>
                </Box>
            </Popover>
        </div>
    );
};
