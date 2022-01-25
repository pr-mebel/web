import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import RoomIcon from '@material-ui/icons/Room';
import cn from 'classnames';
import React, { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Map as YMap, Placemark, YMaps as YMapsProvider } from 'react-yandex-maps';

import { BlockTitle, Link } from '@/components/common';
import { useAnalytics } from '@/hooks';

// TODO: Заменить на SVG
const apple = 'images/common/map/apple.png';
const google = 'images/common/map/google.png';
const yandex = 'images/common/map/yandex.png';
const mail = 'images/common/map/mail-icon.svg';

const useStyles = makeStyles((theme) => ({
    content: {
        marginTop: '40px',
    },
    subtitle: {
        margin: '20px 0',
    },
    list: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
    },
    listItem: {
        marginTop: '12px',
        position: 'relative',
        paddingLeft: '30px',
    },
    icon: {
        position: 'absolute',
        width: '20px',
        height: '20px',
        left: '0',
        top: '-2px',
        color: 'grey',
    },
    email: {
        textDecoration: 'underline',
        '&:hover': {
            textDecoration: 'none',
        },
    },
    mapsText: {
        textDecoration: 'underline',
        color: theme.palette.grey[500],
        '&:hover': {
            textDecoration: 'none',
        },
    },
    message: {
        marginTop: '30px',
        display: 'flex',
        alignItems: 'center',
    },
    messageText: {
        marginLeft: '15px',
        textDecoration: 'underline',
        color: theme.palette.primary.main,
        '&:hover': {
            textDecoration: 'none',
        },
    },
    // TODO: Rename
    hl: {
        marginTop: '20px',
        width: '265px',
        height: '1px',
        background: theme.palette.grey[300],
        content: '""',
    },
    mapContainer: {
        marginTop: '30px',
        minHeight: '400px',
    },
}));

export const Map: FC = () => {
    const analytics = useAnalytics();
    const classes = useStyles();
    const theme = useTheme();
    const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const { ref, inView } = useInView({
        triggerOnce: true,
    });

    useEffect(() => {
        if (inView) {
            analytics.onContactsInView();
        }
    }, [inView, analytics]);

    return (
        <Container innerRef={ref}>
            <BlockTitle>
                <Typography variant="h4">Приезжайте к нам в гости!</Typography>
            </BlockTitle>
            <Grid container className={classes.content}>
                <Grid item xs={12} sm={5}>
                    <Typography variant="body2">
                        Мы&nbsp;с&nbsp;удовольствием покажем весь ассортимент нашей мебели и&nbsp;поможем вам сделать
                        правильный выбор.
                    </Typography>
                    <Typography variant="h6" className={classes.subtitle}>
                        Салон &ldquo;ЧАСТНЫЙ МЕБЕЛЬЕР&ldquo;
                    </Typography>
                    <ul className={classes.list}>
                        <li className={classes.listItem}>
                            <RoomIcon className={classes.icon} />
                            <Typography variant="body2">м. Сокол, ул. Балтийская, д.9</Typography>
                        </li>
                        <li className={classes.listItem}>
                            <PhoneIcon className={classes.icon} />
                            <Typography variant="body2" onClick={analytics.onContactsPhoneClick}>
                                <Link to="tel:+7(495)2780285" external>
                                    +7 (495) 278-02-85
                                </Link>
                            </Typography>
                        </li>
                        <li className={classes.listItem}>
                            <MailIcon className={classes.icon} />
                            <Typography variant="body2" onClick={analytics.onContactsMailClick}>
                                E-mail:
                                {'\xA0'}
                                <Link to="mailto:zakaz@pr-mebel.ru" external className={classes.email}>
                                    zakaz@pr-mebel.ru
                                </Link>
                            </Typography>
                        </li>
                        <li className={classes.listItem}>
                            <LocalParkingIcon className={classes.icon} />
                            <Typography variant="body2">Бесплатная парковка</Typography>
                        </li>
                        <li className={classes.listItem}>
                            <QueryBuilderIcon className={classes.icon} />
                            <Typography variant="body2">
                                Время работы: с 10:00 до 20:00
                                <br />
                                Без выходных.
                            </Typography>
                        </li>
                    </ul>
                    <div className={classes.hl} />
                    <ul className={classes.list}>
                        <li className={classes.listItem}>
                            <img src={yandex} alt="Яндекс" className={classes.icon} />
                            <Typography variant="body2" className={classes.mapsText}>
                                <Link
                                    to={
                                        isDesktop
                                            ? 'https://yandex.ru/maps/-/CCQtFQdaLA'
                                            : 'yandexnavi://build_route_on_map?lat_to=55.809176&lon_to=37.512955'
                                    }
                                    external
                                >
                                    Открыть в Яндекс навигаторе
                                </Link>
                            </Typography>
                        </li>
                        <li className={classes.listItem}>
                            <img src={google} alt="Google" className={classes.icon} />
                            <Typography variant="body2" className={classes.mapsText}>
                                <Link
                                    to={
                                        isDesktop
                                            ? 'https://goo.gl/maps/WZTKJ95GqKgV5YPr7'
                                            : 'comgooglemaps://?q=55.809176,37.512955'
                                    }
                                    external
                                >
                                    Открыть Google Maps
                                </Link>
                            </Typography>
                        </li>
                        <li className={classes.listItem}>
                            <img src={apple} alt="Apple" className={classes.icon} />
                            <Typography variant="body2" className={classes.mapsText}>
                                <Link to="http://maps.apple.com/?daddr=55.809176,37.512955" external>
                                    Открыть Apple Maps
                                </Link>
                            </Typography>
                        </li>
                    </ul>
                    <div className={classes.message}>
                        <img src={mail} alt="Картинка письма" />
                        <Typography
                            variant="body2"
                            className={classes.messageText}
                            onClick={analytics.onContactsMailClick}
                        >
                            <Link to="mailto:zakaz@pr-mebel.ru" external>
                                Написать письмо
                            </Link>
                        </Typography>
                    </div>
                </Grid>
                <Grid item sm={1} />
                <Grid
                    item
                    xs={12}
                    sm={6}
                    className={cn({
                        [classes.mapContainer]: isXsDown,
                    })}
                >
                    <YMapsProvider>
                        <YMap
                            width="100%"
                            height="100%"
                            defaultState={{
                                center: [55.806696, 37.513225],
                                zoom: 16,
                                controls: [
                                    'zoomControl',
                                    'fullscreenControl',
                                    'geolocationControl',
                                    'trafficControl',
                                    'typeSelector',
                                ],
                            }}
                            modules={[
                                'control.ZoomControl',
                                'control.FullscreenControl',
                                'control.GeolocationControl',
                                'control.TrafficControl',
                                'control.TypeSelector',
                            ]}
                        >
                            <Placemark defaultGeometry={[55.808543, 37.512389]} />
                        </YMap>
                    </YMapsProvider>
                </Grid>
            </Grid>
        </Container>
    );
};
