import { Box, Container, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';

import { Link } from '@/components';
import { LogoFooter, Vkontakte } from '@/components/icons';
import { useAnalytics, useContactFormModal } from '@/hooks';

import { ColumnTitle, List } from './components';

export const Footer: FC = () => {
    const analytics = useAnalytics();
    const contactFormModal = useContactFormModal();

    return (
        <Box
            sx={(theme) => ({
                marginTop: {
                    xs: '40px',
                    sm: '60px',
                    md: '80px',
                },
                background: theme.palette.grey[900],
                padding: '80px 0',
                color: 'white',
            })}
        >
            <Container>
                <Grid
                    container
                    justifyContent="center"
                    sx={{
                        margin: {
                            xs: '0 auto 48px',
                            sm: '0 0 48px',
                        },
                        width: {
                            xs: '290px',
                            sm: 'auto',
                        },
                    }}
                >
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <Link>
                            <LogoFooter
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                }}
                            />
                        </Link>
                        <Typography
                            align="center"
                            sx={{
                                marginTop: '3px',
                                textTransform: 'uppercase',
                            }}
                        >
                            Салон мебели премиум класса
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={3} container direction="column" alignItems="center">
                        <div>
                            <ColumnTitle href="/catalog">Каталог</ColumnTitle>
                            <List>
                                <li>
                                    <Link href="/catalog?section=cupboard&style=classic" className="listItem">
                                        Шкафы классические
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/catalog?section=cupboard&style=modern" className="listItem">
                                        Шкафы современные
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/catalog?section=wardrobe&style=classic" className="listItem">
                                        Гардеробные классические
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/catalog?section=wardrobe&style=modern" className="listItem">
                                        Гардеробные современные
                                    </Link>
                                </li>
                            </List>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} container direction="column" alignItems="center">
                        <div>
                            <ColumnTitle href="/#advantages">Преимущества</ColumnTitle>
                            <List>
                                <li>
                                    <Link href="/#advantages" className="listItem">
                                        Наши материалы
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#comfort" className="listItem">
                                        Комфорт и удобство
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#quality" className="listItem">
                                        Исключительное качество
                                    </Link>
                                </li>
                            </List>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} container direction="column" alignItems="center">
                        <div>
                            <ColumnTitle href="/#about">О нас</ColumnTitle>
                            <List>
                                <li>
                                    <Link href="/#about" className="listItem">
                                        Почему следует выбрать нас
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#production" className="listItem">
                                        Наше производство
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#how-to-order" className="listItem">
                                        Как заказать нашу мебель
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#faq" className="listItem">
                                        Часто задаваемые вопросы
                                    </Link>
                                </li>
                            </List>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} container direction="column" alignItems="center">
                        <div>
                            <ColumnTitle asButton onClick={() => contactFormModal.onOpen()}>
                                Связаться с нами
                            </ColumnTitle>
                            <List>
                                <li>
                                    <Link asButton className="listItem" onClick={() => contactFormModal.onOpen()}>
                                        Заказать звонок
                                    </Link>
                                </li>
                                <li>
                                    <Link asButton className="listItem" onClick={() => contactFormModal.onOpen()}>
                                        Получить проект
                                    </Link>
                                </li>
                                <li>
                                    <Link asButton className="listItem" onClick={() => contactFormModal.onOpen()}>
                                        Вызвать дизайнера замерщика
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#questions" className="listItem">
                                        Задать вопрос
                                    </Link>
                                </li>
                            </List>
                        </div>
                    </Grid>
                </Grid>
                <Grid
                    container
                    alignItems="center"
                    sx={{
                        marginTop: '40px',
                    }}
                >
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <Link href="tel:+7(495)2780285" external onClick={analytics.onFooterPhoneClick}>
                            +7 (495) 278-02-85
                        </Link>
                        <Typography
                            sx={(theme) => ({
                                marginBottom: '30px',
                                '& .text': {
                                    display: 'inline-block',
                                    [theme.breakpoints.down('sm')]: {
                                        display: 'block',
                                    },
                                },
                                '& .space': {
                                    [theme.breakpoints.down('sm')]: {
                                        display: 'none',
                                    },
                                },
                            })}
                        >
                            <Typography component="span" className="text">
                                м. Сокол, ул. Балтийская, д.9.
                            </Typography>
                            <Typography component="span" className="space">
                                {' '}
                            </Typography>
                            <Typography component="span" className="text">
                                С 10:00 до 20:00
                            </Typography>
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '24px',
                                marginBottom: '24px',
                            }}
                        >
                            Мы в соц.сетях
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={4} />
                    <Grid
                        item
                        xs={6}
                        sm={4}
                        container
                        sx={(theme) => ({
                            marginBottom: '24px',
                            '& .socialIcon': {
                                width: '35px',
                                height: '35px',
                                '& path': {
                                    fill: 'white',
                                },
                                '&:hover path': {
                                    fill: theme.palette.primary.main,
                                    transition: 'fill .1s',
                                },
                            },
                        })}
                    >
                        <Grid item xs={12} container justifyContent="center">
                            <Link href="https://vk.com/public185518769" external>
                                <Vkontakte className="socialIcon" />
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} sm={4} />
                    <Grid item xs={12}>
                        <Typography
                            align="center"
                            sx={(theme) => ({
                                '& .copyLink': {
                                    display: 'inline-block',
                                },
                                [theme.breakpoints.down('sm')]: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    '& .copyLink': {
                                        marginBottom: '10px',
                                    },
                                },
                                '& .verticalLine': {
                                    fontSize: '20px',
                                    margin: '0 8px',
                                },
                            })}
                        >
                            <Typography component="span" className="copyLink" variant="body2">
                                <Link
                                    href="https://docs.google.com/document/d/1KSM18JIPpeT6weSQaG3dgpTEC9MO3wvxYWsrF2A6CZE/edit"
                                    external
                                >
                                    Политика конфиденциальности
                                </Link>
                            </Typography>
                            <Box
                                component="span"
                                sx={{
                                    display: {
                                        xs: 'none',
                                        sm: 'inline-block',
                                    },
                                    fontSize: '20px',
                                    margin: '0 8px',
                                }}
                            >
                                |
                            </Box>
                            <Typography component="span" className="copyLink" variant="body2">
                                <Link
                                    href="https://docs.google.com/document/d/1KSM18JIPpeT6weSQaG3dgpTEC9MO3wvxYWsrF2A6CZE/edit"
                                    external
                                >
                                    Пользовательское соглашение
                                </Link>
                            </Typography>
                        </Typography>
                        <Typography variant="body2" align="center">
                            &copy; Частный Мебельер
                            <Box
                                component="span"
                                sx={{
                                    fontSize: '20px',
                                    margin: '0 8px',
                                }}
                            >
                                |
                            </Box>
                            2020 Все права защищены законом. Копирование и цитирование только с письменного разрешения
                            автора.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
