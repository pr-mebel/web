import React, { FC, memo, MouseEventHandler } from 'react';
import { Dialog, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    ArrowBack,
    ArrowForward,
    Clear as ClearIcon,
} from '@material-ui/icons';
import cn from 'classnames';
import { MainButton, LoadingBackground, Loader } from '@/components/common';
import { Facebook, Vkontakte, Instagram } from '@/components';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
    paperRoot: {
        position: 'relative',
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
    imgContainer: {
        width: '100%',
        paddingTop: '66.66%',
        position: 'relative',
    },
    descriptionContainer: {
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    socials: {
        marginTop: '10px',
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
    loaderContainer: {
        position: 'absolute',
        top: '0',
        left: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, .3)',
    },
    [theme.breakpoints.down('sm')]: {
        paperRoot: {
            height: '100%',
        },
        container: {
            height: '100%',
            flexDirection: 'column',
            flexWrap: 'nowrap',
        },
        gridItem: {
            flexGrow: '0',
            flexBasis: 'unset',
        },
    },
}));

type ImageProps = {
    url: string;
};

type Props = {
    isOpen: boolean;
    isLoading: boolean;
    selectedItem: {
        id: string;
        collection: string;
        description?: string;
        imageFull: ImageProps;
        imageMedium: ImageProps;
        imageMinified: ImageProps;
    };
    hasPrev?: boolean;
    hasNext?: boolean;
    onClose: MouseEventHandler<SVGSVGElement>;
    onClickBack: MouseEventHandler<HTMLDivElement>;
    onClickForward: MouseEventHandler<HTMLDivElement>;
};

const CardPopupComponent: FC<Props> = ({
    selectedItem,
    isOpen,
    isLoading,
    hasPrev,
    hasNext,
    onClose,
    onClickBack,
    onClickForward,
}) => {
    const classes = useStyles();

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            fullWidth
            maxWidth="lg"
            className={classes.root}
            PaperProps={{
                className: classes.paperRoot,
            }}
        >
            <ClearIcon className={classes.closeIcon} onClick={onClose} />
            <Grid container className={classes.container}>
                <Grid item xs={12} md={7} className={classes.gridItem}>
                    {isLoading && (
                        <div className={classes.loaderContainer}>
                            <Loader />
                        </div>
                    )}
                    <LoadingBackground>
                        <div className={classes.imgContainer}>
                            {hasPrev && (
                                <>
                                    <div
                                        className={cn(
                                            classes.arrow,
                                            classes.arrowLeft
                                        )}
                                        onClick={onClickBack}
                                    >
                                        <ArrowBack className={classes.icon} />
                                    </div>
                                </>
                            )}
                            <Image
                                src={selectedItem.imageMedium.url}
                                key={selectedItem.imageMedium.url}
                                alt="Картинка в модальном окне"
                                layout="fill"
                            />
                            {hasNext && (
                                <>
                                    <div
                                        className={cn(
                                            classes.arrow,
                                            classes.arrowRight
                                        )}
                                        onClick={onClickForward}
                                    >
                                        <ArrowForward
                                            className={classes.icon}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </LoadingBackground>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={5}
                    className={classes.descriptionContainer}
                >
                    <div className={classes.descriptionContainerTop}>
                        <Typography
                            variant="body1"
                            gutterBottom
                            className={classes.title}
                        >
                            Коллекция:&nbsp;
                            <Typography
                                variant="body1"
                                component="span"
                                className={classes.text}
                            >
                                {selectedItem.collection}
                            </Typography>
                        </Typography>
                        {selectedItem.description && (
                            <div className={classes.description}>
                                <Typography
                                    variant="body1"
                                    className={classes.title}
                                >
                                    Описание:
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className={classes.text}
                                >
                                    {selectedItem.description}
                                </Typography>
                            </div>
                        )}
                        <Typography
                            variant="body1"
                            gutterBottom
                            className={classes.title}
                        >
                            Артикул:&nbsp;
                            <Typography
                                variant="body1"
                                component="span"
                                className={classes.text}
                            >
                                {selectedItem.id}
                            </Typography>
                        </Typography>
                    </div>
                    <div className={classes.descriptionContainerTop}>
                        <MainButton>Рассчитать стоимость</MainButton>
                        <Grid container className={classes.socials}>
                            <Grid item xs={3} sm={4} />
                            <Grid item xs={6} sm={4} container spacing={2}>
                                <Grid
                                    item
                                    xs={4}
                                    container
                                    justifyContent="center"
                                >
                                    <a href="https://www.instagram.com/pr_mebel.ru/">
                                        <Instagram
                                            className={classes.socialIcon}
                                        />
                                    </a>
                                </Grid>
                                <Grid
                                    item
                                    xs={4}
                                    container
                                    justifyContent="center"
                                >
                                    <a href="https://vk.com/public185518769">
                                        <Vkontakte
                                            className={classes.socialIcon}
                                        />
                                    </a>
                                </Grid>
                                <Grid
                                    item
                                    xs={4}
                                    container
                                    justifyContent="center"
                                >
                                    <a href="https://www.facebook.com/%D0%A7%D0%B0%D1%81%D1%82%D0%BD%D1%8B%D0%B9-%D0%BC%D0%B5%D0%B1%D0%B5%D0%BB%D1%8C%D0%B5%D1%80-108136607213942">
                                        <Facebook
                                            className={classes.socialIcon}
                                        />
                                    </a>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export const CardPopup = memo(CardPopupComponent);
