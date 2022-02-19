import { Box, Container, Grid, Typography, useScrollTrigger } from '@mui/material';
import React, { FC, useCallback, useState } from 'react';

import { Link } from '@/components';
import { LogoHeader } from '@/components/icons';
import { useAnalytics } from '@/hooks';

import { Dropdown, List, SocialIconsList } from '../components';

export const DesktopHeader: FC = () => {
    const analytics = useAnalytics();

    const [dropdownVisible, setDropdownVisible] = useState(false);

    /**
     * Флаг, отвечающий за уменьшение высоты хедера. Срабатывает при прокрутке вниз на 500пк
     */
    const smallHeader = useScrollTrigger({
        threshold: 500,
    });

    /**
     * Открывает дропдаун каталога
     */
    const handleOpenDropdown = useCallback(() => {
        setDropdownVisible(true);
    }, []);

    /**
     * Закрывает дропдаун каталога
     */
    const handleCloseDropdown = useCallback(() => {
        setDropdownVisible(false);
    }, []);

    return (
        <Box
            component="header"
            sx={(theme) => ({
                height: smallHeader ? '50px' : '70px',
                display: 'flex',
                width: '100%',
                position: 'fixed',
                top: '0',
                zIndex: 100,
                alignItems: 'center',
                backgroundColor: 'white',
                boxShadow: '0 10px 20px rgba(0,0,0,.1)',
                transition: '.1s height',
                [theme.breakpoints.down('lg')]: {
                    height: '50px',
                },
            })}
        >
            <Container>
                <Grid container>
                    <Grid
                        item
                        xs={2}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                        }}
                    >
                        <Link
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <LogoHeader
                                sx={{
                                    width: 'auto',
                                    height: smallHeader ? '40px' : '47px',
                                    transition: '.1s height',
                                }}
                            />
                        </Link>
                    </Grid>
                    <Grid item xs={7} container justifyContent="center" alignItems="center">
                        <List
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                width: '100%',
                                maxWidth: '600px',
                                '& .text': {
                                    fontSize: '13px',
                                    textTransform: 'uppercase',
                                },
                            }}
                        >
                            <li onMouseEnter={handleOpenDropdown} onMouseLeave={handleCloseDropdown}>
                                <Typography
                                    sx={(theme) => ({
                                        display: 'inline-block',
                                        position: 'relative',
                                        color: 'inherit',
                                        transition: 'color .1s',
                                        '&:hover': {
                                            color: theme.palette.primary.main,
                                        },
                                        cursor: 'pointer',
                                    })}
                                    className="text"
                                >
                                    Каталог
                                    <Box component="span" sx={{ marginLeft: '6px' }}>
                                        <Dropdown />
                                    </Box>
                                </Typography>
                                {dropdownVisible && (
                                    <List
                                        sx={{
                                            width: '180px',
                                            background: 'white',
                                            padding: '8px',
                                            position: 'absolute',
                                            boxShadow: '0 10px 20px rgba(0,0,0,.1)',
                                            '& .text': {
                                                fontSize: '13px',
                                                textTransform: 'uppercase',
                                            },
                                        }}
                                    >
                                        <li>
                                            <Link href="/catalog?section=cupboard" className="text">
                                                Шкафы
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/catalog?section=wardrobe" className="text">
                                                Гардеробные
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/catalog?section=accessories" className="text">
                                                Аксессуары
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/catalog?section=lightingSystems" className="text">
                                                Системы подсветки
                                            </Link>
                                        </li>
                                    </List>
                                )}
                            </li>
                            <li>
                                <Link href="/#design-offer" className="text">
                                    Рассчитать стоимость
                                </Link>
                            </li>
                            <li>
                                <Link href="/#advantages" className="text">
                                    Преимущества
                                </Link>
                            </li>
                            <li>
                                <Link href="/#about" className="text">
                                    О нас
                                </Link>
                            </li>
                            <li>
                                <Link href="/#contacts" className="text">
                                    Контакты
                                </Link>
                            </li>
                        </List>
                    </Grid>
                    <Grid item xs={3} container justifyContent="space-between" alignItems="center">
                        <List
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                '& .text': {
                                    display: 'block',
                                    fontSize: '13px',
                                    textTransform: 'uppercase',
                                },
                            }}
                        >
                            <li>
                                <Link
                                    href="tel:+74952780285"
                                    external
                                    className="text"
                                    onClick={analytics.onHeaderPhoneClick}
                                >
                                    +7 (495) 278-02-85
                                </Link>
                            </li>
                            {!smallHeader && (
                                <>
                                    <li>
                                        <Link href="https://yandex.ru/maps/-/CCQtFQdaLA" external className="text">
                                            м. сокол
                                        </Link>
                                    </li>
                                    <li>
                                        <Typography variant="body2" className="text">
                                            10:00 - 20:00
                                        </Typography>
                                    </li>
                                </>
                            )}
                        </List>
                        <SocialIconsList />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
