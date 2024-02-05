import { ArrowBack, ArrowForward, Clear as ClearIcon } from '@mui/icons-material';
import { Box, Dialog, Grid, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, memo } from 'react';

import { OrderFormPopup } from '@/blocks/common';
import { Button } from '@/components/common';
import { Vkontakte } from '@/components/icons';
import { Image as ImageType } from '@/entities';
import { useModal } from '@/hooks';

import { FullscreenCardPopup } from './components';

type Props = {
    isOpen: boolean;
    selectedItem: {
        id: string;
        collection: string;
        description?: string;
        imageFull: ImageType;
        imageMedium: ImageType;
        imageMinified: ImageType;
    };
    hasPrev?: boolean;
    hasNext?: boolean;
    onClose: () => void;
    onClickBack: () => void;
    onClickForward: () => void;
};

const CardPopupComponent: FC<Props> = ({
    selectedItem,
    isOpen,
    hasPrev,
    hasNext,
    onClose,
    onClickBack,
    onClickForward,
}) => {
    const fullscreenModal = useModal();
    const contactFormModal = useModal();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={onClose}
                fullWidth
                PaperProps={{
                    sx: (theme) => ({
                        position: 'relative',
                        maxWidth: '1110px',
                        '@media (max-width: 1199px)': {
                            maxWidth: '850px',
                        },
                        [theme.breakpoints.down('md')]: {
                            height: '100%',
                        },
                    }),
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
                <Box
                    sx={(theme) => ({
                        display: 'grid',
                        gridTemplateColumns: '750px 1fr',
                        '@media (max-width: 1199px)': {
                            gridTemplateColumns: '480px 1fr',
                        },
                        [theme.breakpoints.down('md')]: {
                            height: '100%',
                            display: 'flex',
                            gridTemplateColumns: 'unset',
                            flexDirection: 'column',
                            flexWrap: 'nowrap',
                        },
                        '& .imgContainer': {
                            width: '100%',
                            paddingTop: '75%',
                            position: 'relative',
                        },
                        '& .arrow': {
                            position: 'absolute',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 50,
                            backgroundColor: 'rgba(0, 0, 0, .2)',
                            width: '50px',
                            height: '30px',
                            top: 'calc(50% - 15px)',
                            cursor: 'pointer',
                        },
                        '& .arrowLeft': {
                            left: '0',
                        },
                        '& .arrowRight': {
                            right: '0',
                        },
                        '& .icon': {
                            color: 'white',
                        },
                    })}
                >
                    <div className="imgContainer">
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
                        {hasPrev && (
                            <div className="arrow arrowLeft" onClick={onClickBack}>
                                <ArrowBack className="icon" />
                            </div>
                        )}
                        <div
                            style={{
                                backgroundImage: `url(${selectedItem.imageMedium.url})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                cursor: isMdDown ? 'default' : 'pointer',
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                width: '100%',
                                height: '100%',
                            }}
                            onClick={() => {
                                if (!isMdDown) {
                                    fullscreenModal.handleOpen();
                                }
                            }}
                        />
                        {hasNext && (
                            <div className="arrow arrowRight" onClick={onClickForward}>
                                <ArrowForward className="icon" />
                            </div>
                        )}
                    </div>
                    <Box
                        sx={(theme) => ({
                            padding: '25px 30px 20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            [theme.breakpoints.down('md')]: {
                                height: '100%',
                            },
                            '& .title': {
                                fontSize: '16px',
                                textTransform: 'capitalize',
                                fontWeight: 500,
                            },
                            '& .text': {
                                fontSize: '16px',
                            },
                        })}
                    >
                        <div>
                            <Typography variant="body1" gutterBottom className="title">
                                Коллекция:&nbsp;
                                <Typography variant="body1" component="span" className="text">
                                    {selectedItem.collection}
                                </Typography>
                            </Typography>
                            {selectedItem.description && (
                                <Box
                                    sx={{
                                        marginBottom: '10px',
                                    }}
                                >
                                    <Typography variant="body1" className="title">
                                        Описание:
                                    </Typography>
                                    <Typography variant="body1" className="text">
                                        {selectedItem.description}
                                    </Typography>
                                </Box>
                            )}
                            <Typography variant="body1" gutterBottom className="title">
                                Артикул:&nbsp;
                                <Typography variant="body1" component="span" className="text">
                                    {selectedItem.id}
                                </Typography>
                            </Typography>
                        </div>
                        <div>
                            <Button block onClick={() => contactFormModal.handleOpen()}>
                                Рассчитать стоимость
                            </Button>
                            <Grid
                                container
                                sx={{
                                    marginTop: '20px',
                                }}
                            >
                                <Grid item xs={3} sm={4} />
                                <Grid item xs={6} sm={4} container spacing={2}>
                                    <Grid item xs={12} container justifyContent="center">
                                        <a href="https://vk.com/public185518769">
                                            <Vkontakte />
                                        </a>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </Box>
                </Box>
            </Dialog>
            <FullscreenCardPopup
                isOpen={fullscreenModal.isOpen}
                onClose={fullscreenModal.handleClose}
                image={selectedItem.imageFull}
            />
            <OrderFormPopup
                isOpen={contactFormModal.isOpen}
                meta={{
                    Артикул: selectedItem.id,
                    Коллекция: selectedItem.collection,
                    Картинка: selectedItem.imageMedium.url,
                }}
                onClose={contactFormModal.handleClose}
            />
        </>
    );
};

export const CardPopup = memo(CardPopupComponent);
