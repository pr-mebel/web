import MenuIcon from '@mui/icons-material/Menu';
import { Box, Container, Drawer, Grid, styled, Typography } from '@mui/material';
import React, { FC, useCallback, useState } from 'react';

import { useYaCounter54949111 } from '@/analytics';
import { Button, Link } from '@/components';
import { LogoHeader } from '@/components/icons';
import { useInquiryForm } from '@/context/inquiry-form';

import { SocialIconsList } from '../components';

const Hl = styled('div')(({ theme }) => ({
    width: '100%',
    height: '1px',
    background: theme.palette.grey[300],
    content: '""',
    margin: '10px 0',
}));

export const MobileHeader: FC = () => {
    const analytics = useYaCounter54949111();
    const { inquiryModal } = useInquiryForm();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    /**
     * Открывает сайдбар
     */
    const handleOpenDrawer = useCallback(() => {
        setIsDrawerOpen(true);
    }, []);

    /**
     * Закрывает сайдбар
     */
    const handleCloseDrawer = useCallback(() => {
        setIsDrawerOpen(false);
    }, []);

    return (
        <Box
            component="header"
            sx={{
                height: '60px',
                display: 'flex',
                width: '100%',
                position: 'fixed',
                top: '0',
                zIndex: 100,
                alignItems: 'center',
                backgroundColor: 'white',
                boxShadow: '0 10px 20px rgba(0,0,0,.1)',
            }}
        >
            <Container>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Link
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            width: '150px',
                        }}
                    >
                        <LogoHeader
                            sx={{
                                width: '130px',
                                height: 'auto',
                            }}
                        />
                    </Link>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            '& .text': {
                                fontSize: '13px',
                                textTransform: 'uppercase',
                            },
                            '& .address': {
                                display: {
                                    xs: 'none',
                                    sm: 'block',
                                },
                            },
                        }}
                    >
                        <Link
                            className="text"
                            href="tel:+74952780285"
                            external
                            onClick={() => analytics.track('phone-number/click')}
                        >
                            +7 (495) 278-02-85
                        </Link>
                        <Box className="address">
                            <Typography className="text" align="center">
                                <Link
                                    className="text"
                                    href="https://yandex.ru/maps/-/CCQtFQdaLA"
                                    external
                                >
                                    м. сокол
                                </Link>{' '}
                                10:00 - 20:00
                            </Typography>
                        </Box>
                    </Box>
                    <MenuIcon
                        sx={{
                            cursor: 'pointer',
                            width: '35px',
                            height: '35px',
                        }}
                        onClick={handleOpenDrawer}
                    />
                </Box>
                <Drawer
                    anchor="right"
                    open={isDrawerOpen}
                    PaperProps={{
                        sx: {
                            width: '250px',
                            boxSizing: 'border-box',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            '& .link': {
                                textTransform: 'uppercase',
                            },
                        },
                    }}
                    onClick={handleCloseDrawer}
                    onClose={handleCloseDrawer}
                >
                    <Grid container>
                        <Grid item xs={12}>
                            <Link href="/catalog" className="link">
                                Каталог
                            </Link>
                        </Grid>
                        <Hl />
                        <Grid
                            item
                            xs={12}
                            container
                            spacing={1}
                            direction="column"
                            style={{ paddingLeft: '10px' }}
                        >
                            <Grid item xs>
                                <Link href="/catalog?section=cupboard" className="link">
                                    Шкафы
                                </Link>
                            </Grid>
                            <Grid item xs>
                                <Link href="/catalog?section=wardrobe" className="link">
                                    Гардеробные
                                </Link>
                            </Grid>
                            <Grid item xs>
                                <Link href="/catalog?section=accessories" className="link">
                                    Аксессуары
                                </Link>
                            </Grid>
                            <Grid item xs>
                                <Link href="/catalog?section=lightingSystems" className="link">
                                    Системы подсветки
                                </Link>
                            </Grid>
                        </Grid>
                        <Hl />
                        <Grid item xs={12} container spacing={1} direction="column">
                            <Grid item xs>
                                <Link href="/#design-offer" className="link">
                                    Рассчитать стоимость
                                </Link>
                            </Grid>
                            <Grid item xs>
                                <Link href="/#advantages" className="link">
                                    Преимущества
                                </Link>
                            </Grid>
                            <Grid item xs>
                                <Link href="/#about" className="link">
                                    О нас
                                </Link>
                            </Grid>
                            <Grid item xs>
                                <Link href="/#contacts" className="link">
                                    Контакты
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                '& .text': {
                                    display: 'block',
                                    fontSize: '13px',
                                    textTransform: 'uppercase',
                                },
                            }}
                        >
                            <Typography className="text" align="center">
                                <Link
                                    href="tel:+74952780285"
                                    external
                                    onClick={() => analytics.track('phone-number/click')}
                                >
                                    +7 (495) 278-02-85
                                </Link>
                            </Typography>
                            <Typography className="text" align="center">
                                <Link href="https://yandex.ru/maps/-/CCQtFQdaLA" external>
                                    м. сокол
                                </Link>
                            </Typography>
                            <Typography className="text" align="center">
                                10:00 - 20:00
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <SocialIconsList />
                        </Grid>
                        <Grid item xs>
                            <Button block onClick={() => inquiryModal.handleOpen({})}>
                                Заказать звонок
                            </Button>
                        </Grid>
                    </Grid>
                </Drawer>
            </Container>
        </Box>
    );
};
