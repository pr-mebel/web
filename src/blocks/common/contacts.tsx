import LocalParkingIcon from '@mui/icons-material/LocalParking';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import RoomIcon from '@mui/icons-material/Room';
import { Box, Container, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Map as YMap, Placemark, YMaps as YMapsProvider } from '@pbe/react-yandex-maps';
import React, { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { BlockTitle, Link } from '@/components/common';
import { useAnalytics } from '@/hooks';

// TODO: Заменить на SVG
const apple = 'images/common/map/apple.png';
const google = 'images/common/map/google.png';
const yandex = 'images/common/map/yandex.png';
const mail = 'images/common/map/mail-icon.svg';

export const Contacts: FC = () => {
    const analytics = useAnalytics();
    const theme = useTheme();
    const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
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
        <Container ref={ref}>
            <BlockTitle>
                <Typography variant="h4">Приезжайте к нам в гости!</Typography>
            </BlockTitle>
            <Grid
                container
                sx={{
                    marginTop: '40px',
                }}
            >
                <Grid item xs={12} sm={5} className="contact__connect">
                    <Typography variant="body2">
                        Мы&nbsp;с&nbsp;удовольствием покажем весь ассортимент нашей мебели и&nbsp;поможем вам сделать
                        правильный выбор.
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            margin: '20px 0',
                        }}
                    >
                        Салон &ldquo;ЧАСТНЫЙ МЕБЕЛЬЕР&ldquo;
                    </Typography>
                    <Box
                        component="ul"
                        sx={{
                            margin: '0',
                            padding: '0',
                            listStyle: 'none',
                            '& .listItem': {
                                marginTop: '12px',
                                position: 'relative',
                                paddingLeft: '30px',
                            },
                            '& .icon': {
                                position: 'absolute',
                                width: '20px',
                                height: '20px',
                                left: '0',
                                top: '-2px',
                                color: 'grey',
                            },
                        }}
                    >
                        <li className="listItem">
                            <RoomIcon className="icon" />
                            <Typography variant="body2">м. Сокол, ул. Балтийская, д.9</Typography>
                        </li>
                        <li className="listItem">
                            <PhoneIcon className="icon" />
                            <Typography variant="body2" onClick={analytics.onContactsPhoneClick}>
                                <Link href="tel:+7(495)2780285" external>
                                    +7 (495) 278-02-85
                                </Link>
                            </Typography>
                        </li>
                        <li className="listItem">
                            <MailIcon className="icon" />
                            <Typography variant="body2" onClick={analytics.onContactsMailClick}>
                                E-mail:
                                {'\xA0'}
                                <Link
                                    href="mailto:zakaz@pr-mebel.ru"
                                    external
                                    sx={{
                                        textDecoration: 'underline',
                                        '&:hover': {
                                            textDecoration: 'none',
                                        },
                                    }}
                                >
                                    zakaz@pr-mebel.ru
                                </Link>
                            </Typography>
                        </li>
                        <li className="listItem">
                            <LocalParkingIcon className="icon" />
                            <Typography variant="body2">Бесплатная парковка</Typography>
                        </li>
                        <li className="listItem">
                            <QueryBuilderIcon className="icon" />
                            <Typography variant="body2">
                                Время работы: с 10:00 до 20:00
                                <br />
                                Без выходных.
                            </Typography>
                        </li>
                    </Box>
                    <Box
                        sx={{
                            marginTop: '20px',
                            width: '265px',
                            height: '1px',
                            background: theme.palette.grey[300],
                            content: '""',
                        }}
                    />
                    <Box
                        component="ul"
                        sx={(theme) => ({
                            margin: '0',
                            padding: '0',
                            listStyle: 'none',
                            '& .listItem': {
                                marginTop: '12px',
                                position: 'relative',
                                paddingLeft: '30px',
                            },
                            '& .icon': {
                                position: 'absolute',
                                width: '20px',
                                height: '20px',
                                left: '0',
                                top: '-2px',
                                color: 'grey',
                            },
                            '& .mapsText': {
                                textDecoration: 'underline',
                                color: theme.palette.grey[500],
                                '&:hover': {
                                    textDecoration: 'none',
                                },
                            },
                        })}
                    >
                        <li className="listItem">
                            <img src={yandex} alt="Яндекс" className="icon" />
                            <Typography variant="body2" className="mapsText">
                                <Link
                                    href={
                                        isDesktop
                                            ? 'https://yandex.ru/maps/-/CCQtFQdaLA'
                                            : 'yandexnavi://build_route_on_map?lat_to=55.809176&lon_to=37.512955'
                                    }
                                    external
                                    underline
                                >
                                    Открыть в Яндекс навигаторе
                                </Link>
                            </Typography>
                        </li>
                        <li className="listItem">
                            <img src={google} alt="Google" className="icon" />
                            <Typography variant="body2" className="mapsText">
                                <Link
                                    href={
                                        isDesktop
                                            ? 'https://goo.gl/maps/WZTKJ95GqKgV5YPr7'
                                            : 'comgooglemaps://?q=55.809176,37.512955'
                                    }
                                    external
                                    underline
                                >
                                    Открыть Google Maps
                                </Link>
                            </Typography>
                        </li>
                        <li className="listItem">
                            <img src={apple} alt="Apple" className="icon" />
                            <Typography variant="body2" className="mapsText">
                                <Link href="http://maps.apple.com/?daddr=55.809176,37.512955" external underline>
                                    Открыть Apple Maps
                                </Link>
                            </Typography>
                        </li>
                    </Box>
                    <Box
                        sx={{
                            marginTop: '30px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <img src={mail} alt="Картинка письма" />
                        <Typography
                            variant="body2"
                            sx={(theme) => ({
                                marginLeft: '15px',
                                textDecoration: 'underline',
                                color: theme.palette.primary.main,
                                '&:hover': {
                                    textDecoration: 'none',
                                },
                            })}
                            onClick={analytics.onContactsMailClick}
                        >
                            <Link href="mailto:zakaz@pr-mebel.ru" external underline>
                                Написать письмо
                            </Link>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item sm={1} />
                <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={
                        isSmDown
                            ? {
                                  marginTop: '30px',
                                  minHeight: '400px',
                              }
                            : {}
                    }
                >
                    <YMapsProvider>
                        <YMap
                            width="100%"
                            height="100%"
                            defaultState={{
                                center: [55.806216, 37.51111],
                                zoom: 15,
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
                            <Placemark
                                options={{
                                    iconColor: theme.palette.primary.main,
                                }}
                                defaultGeometry={[55.808543, 37.512389]}
                            />
                        </YMap>
                    </YMapsProvider>
                </Grid>
            </Grid>
        </Container>
    );
};
