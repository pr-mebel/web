import { Dialog, Grid, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ArrowBack, ArrowForward, Clear as ClearIcon } from '@material-ui/icons';
import cn from 'classnames';
import React, { FC, memo } from 'react';

import { Facebook, Instagram, Vkontakte } from '@/components';
import { LoadingBackground, MainButton } from '@/components/common';
import { Image as ImageType } from '@/entities';
import { useModal } from '@/hooks';

import { FullscreenCardPopup } from './components';

const useStyles = makeStyles((theme) => ({
    paperRoot: {
        position: 'relative',
        maxWidth: '1110px',
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
    container: {
        display: 'grid',
        gridTemplateColumns: '750px 1fr',
    },
    imgContainer: {
        width: '100%',
        paddingTop: '75%',
        position: 'relative',
    },
    descriptionContainer: {
        padding: '25px 30px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    socials: {
        marginTop: '20px',
    },
    arrow: {
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
    arrowLeft: {
        left: '0',
    },
    arrowRight: {
        right: '0',
    },
    icon: {
        color: 'white',
    },
    title: {
        fontSize: '16px',
        textTransform: 'capitalize',
        fontWeight: 500,
    },
    description: {
        marginBottom: '10px',
    },
    text: {
        fontSize: '16px',
    },
    '@media (max-width: 1199px)': {
        paperRoot: {
            maxWidth: '850px',
        },
        container: {
            gridTemplateColumns: '480px 1fr',
        },
    },
    [theme.breakpoints.down('sm')]: {
        paperRoot: {
            height: '100%',
        },
        loadingBackground: {
            height: 'auto',
        },
        container: {
            height: '100%',
            display: 'flex',
            gridTemplateColumns: 'unset',
            flexDirection: 'column',
            flexWrap: 'nowrap',
        },
        descriptionContainer: {
            height: '100%',
        },
    },
}));

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
    const classes = useStyles();
    const fullscreenModal = useModal();
    const theme = useTheme();
    const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={onClose}
                fullWidth
                className={classes.root}
                PaperProps={{
                    className: classes.paperRoot,
                }}
            >
                <ClearIcon className={classes.closeIcon} onClick={onClose} />
                <div className={classes.container}>
                    <LoadingBackground className={classes.loadingBackground}>
                        <div className={classes.imgContainer}>
                            {hasPrev && (
                                <div className={cn(classes.arrow, classes.arrowLeft)} onClick={onClickBack}>
                                    <ArrowBack className={classes.icon} />
                                </div>
                            )}
                            <div
                                style={{
                                    backgroundImage: `url(${selectedItem.imageMedium.url})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    cursor: isSmDown ? 'default' : 'pointer',
                                    position: 'absolute',
                                    top: '0',
                                    left: '0',
                                    width: '100%',
                                    height: '100%',
                                }}
                                onClick={() => {
                                    if (!isSmDown) {
                                        fullscreenModal.handleOpen();
                                    }
                                }}
                            />
                            {hasNext && (
                                <div className={cn(classes.arrow, classes.arrowRight)} onClick={onClickForward}>
                                    <ArrowForward className={classes.icon} />
                                </div>
                            )}
                        </div>
                    </LoadingBackground>
                    <div className={classes.descriptionContainer}>
                        <div className={classes.descriptionContainerTop}>
                            <Typography variant="body1" gutterBottom className={classes.title}>
                                Коллекция:&nbsp;
                                <Typography variant="body1" component="span" className={classes.text}>
                                    {selectedItem.collection}
                                </Typography>
                            </Typography>
                            {selectedItem.description && (
                                <div className={classes.description}>
                                    <Typography variant="body1" className={classes.title}>
                                        Описание:
                                    </Typography>
                                    <Typography variant="body1" className={classes.text}>
                                        {selectedItem.description}
                                    </Typography>
                                </div>
                            )}
                            <Typography variant="body1" gutterBottom className={classes.title}>
                                Артикул:&nbsp;
                                <Typography variant="body1" component="span" className={classes.text}>
                                    {selectedItem.id}
                                </Typography>
                            </Typography>
                        </div>
                        <div className={classes.descriptionContainerTop}>
                            <MainButton>Рассчитать стоимость</MainButton>
                            <Grid container className={classes.socials}>
                                <Grid item xs={3} sm={4} />
                                <Grid item xs={6} sm={4} container spacing={2}>
                                    <Grid item xs={4} container justifyContent="center">
                                        <a href="https://www.instagram.com/pr_mebel.ru/">
                                            <Instagram className={classes.socialIcon} />
                                        </a>
                                    </Grid>
                                    <Grid item xs={4} container justifyContent="center">
                                        <a href="https://vk.com/public185518769">
                                            <Vkontakte className={classes.socialIcon} />
                                        </a>
                                    </Grid>
                                    <Grid item xs={4} container justifyContent="center">
                                        <a href="https://www.facebook.com/%D0%A7%D0%B0%D1%81%D1%82%D0%BD%D1%8B%D0%B9-%D0%BC%D0%B5%D0%B1%D0%B5%D0%BB%D1%8C%D0%B5%D1%80-108136607213942">
                                            <Facebook className={classes.socialIcon} />
                                        </a>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </Dialog>
            <FullscreenCardPopup
                isOpen={fullscreenModal.isOpen}
                onClose={fullscreenModal.handleClose}
                image={selectedItem.imageFull}
            />
        </>
    );
};

export const CardPopup = memo(CardPopupComponent);
