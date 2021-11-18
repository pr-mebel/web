import React, { FC, useCallback, useState } from 'react';
import cn from 'classnames';
import {
    Grid,
    Container,
    Typography,
    Hidden,
    Drawer,
    useScrollTrigger,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MenuIcon from '@material-ui/icons/Menu';
import { Facebook, Vkontakte, Instagram, LogoHeader } from '@/components';
import { Link } from './link';
import { MainButton } from './main-button';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '70px',
        display: 'flex',
        width: '100%',
        position: 'fixed',
        top: '0',
        zIndex: 100,
        alignItems: 'center',
        backgroundColor: 'white',
        boxShadow: '0 10px 20px rgba(0,0,0,.1)',
        transition: '.1s height',
        [theme.breakpoints.down('md')]: {
            height: '50px',
        },
    },
    rootDense: {
        height: '50px',
    },
    innerWrapperSm: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        height: '47px',
        transition: '.1s height',
    },
    logoDense: {
        height: '40px',
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    logoContainerSm: {
        width: '110px',
        [theme.breakpoints.up('sm')]: {
            width: '150px',
        },
    },
    logoSm: {
        width: '100%',
    },
    text: {
        fontSize: '13px',
        textTransform: 'uppercase',
    },
    list: {
        listStyle: 'none',
        padding: '0',
        margin: '0',
    },
    menu: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        maxWidth: '600px',
        listStyle: 'none',
        padding: '0',
        margin: '0',
    },
    menuIcon: {
        cursor: 'pointer',
        width: '35px',
        height: '35px',
    },
    dropdown: {
        position: 'relative',
        width: '11px',
        top: '-1px',
        color: theme.palette.primary.main,
        transform: 'rotate(-90deg)',
        fontSize: 'inherit',
    },
    menuDropdown: {
        position: 'relative',
        color: 'inherit',
        transition: 'color .1s',
        '&:hover': {
            color: theme.palette.primary.main,
        },
        cursor: 'pointer',
    },
    menuDropdownPopup: {
        width: '180px',
        background: 'white',
        padding: '8px',
        position: 'absolute',
        listStyle: 'none',
        margin: '0',
        boxShadow: '0 10px 20px rgba(0,0,0,.1)',
    },
    contacts: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    social: {
        display: 'flex',
        flexDirection: 'row',
        width: '100px',
        justifyContent: 'space-between',
        margin: 'auto',
    },
    socialIcon: {
        '&:hover path': {
            fill: theme.palette.primary.main,
            transition: 'fill .1s',
        },
    },
    drawer: {
        width: '250px',
        boxSizing: 'border-box',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    // TODO: Rename
    hl: {
        width: '100%',
        height: '1px',
        background: theme.palette.grey[300],
        content: '""',
        margin: '10px 0',
    },
}));

export const Header: FC = () => {
    const classes = useStyles();

    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    /**
     * Флаг, отвечающий за уменьшение высоты хедера. Срабатывает при прокрутке вниз на 500пк
     */
    const smallHeader = useScrollTrigger({
        threshold: 500,
    });

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
        <header
            className={cn(classes.root, {
                [classes.rootDense]: smallHeader && !isMdDown,
            })}
        >
            <Container>
                <Hidden mdDown>
                    <Grid container>
                        <Grid item xs={2} className={classes.logoContainer}>
                            <Link to="/">
                                <LogoHeader
                                    className={cn(classes.logo, {
                                        [classes.logoDense]: smallHeader,
                                    })}
                                />
                            </Link>
                        </Grid>
                        <Grid
                            item
                            xs={7}
                            container
                            justifyContent="center"
                            alignItems="center"
                        >
                            <ul className={cn(classes.menu, classes.list)}>
                                <li
                                    onMouseEnter={handleOpenDropdown}
                                    onMouseLeave={handleCloseDropdown}
                                >
                                    <Typography
                                        className={cn(
                                            classes.text,
                                            classes.menuDropdown
                                        )}
                                        align="center"
                                    >
                                        Каталог&nbsp;
                                        <ArrowBackIosIcon
                                            className={classes.dropdown}
                                        />
                                    </Typography>
                                    {dropdownVisible && (
                                        <ul
                                            className={
                                                classes.menuDropdownPopup
                                            }
                                        >
                                            <li>
                                                <Typography
                                                    className={classes.text}
                                                    gutterBottom
                                                >
                                                    <Link to="/catalog?section=cupboard">
                                                        Шкафы
                                                    </Link>
                                                </Typography>
                                            </li>
                                            <li>
                                                <Typography
                                                    className={classes.text}
                                                    gutterBottom
                                                >
                                                    <Link to="/catalog?section=wardrobe">
                                                        Гардеробные
                                                    </Link>
                                                </Typography>
                                            </li>
                                            <li>
                                                <Typography
                                                    className={classes.text}
                                                    gutterBottom
                                                >
                                                    <Link to="/catalog?section=accessories">
                                                        Аксессуары
                                                    </Link>
                                                </Typography>
                                            </li>
                                            <li>
                                                <Typography
                                                    className={classes.text}
                                                    gutterBottom
                                                >
                                                    <Link to="/catalog?section=lightingSystems">
                                                        Системы подсветки
                                                    </Link>
                                                </Typography>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                                <li>
                                    <Typography className={classes.text}>
                                        <Link to="/#design-offer">
                                            Рассчитать стоимость
                                        </Link>
                                    </Typography>
                                </li>
                                <li>
                                    <Typography className={classes.text}>
                                        <Link to="/#advantages">
                                            Преимущества
                                        </Link>
                                    </Typography>
                                </li>
                                <li>
                                    <Typography className={classes.text}>
                                        <Link to="/#about">О нас</Link>
                                    </Typography>
                                </li>
                                <li>
                                    <Typography className={classes.text}>
                                        <Link to="/#contacts">Контакты</Link>
                                    </Typography>
                                </li>
                            </ul>
                        </Grid>
                        <Grid
                            item
                            xs={3}
                            container
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <ul className={cn(classes.list, classes.contacts)}>
                                <li>
                                    <Typography
                                        variant="body2"
                                        className={classes.text}
                                    >
                                        <Link to="tel:+74952780285" external>
                                            +7 (495) 278-02-85
                                        </Link>
                                    </Typography>
                                </li>
                                {!smallHeader && (
                                    <>
                                        <li>
                                            <Typography
                                                variant="body2"
                                                className={classes.text}
                                            >
                                                <Link
                                                    to="https://yandex.ru/maps/-/CCQtFQdaLA"
                                                    external
                                                >
                                                    м. сокол
                                                </Link>
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography
                                                variant="body2"
                                                className={classes.text}
                                            >
                                                10:00 - 20:00
                                            </Typography>
                                        </li>
                                    </>
                                )}
                            </ul>
                            <ul className={cn(classes.list, classes.social)}>
                                <li>
                                    <a href="https://vk.com/public185518769">
                                        <Vkontakte
                                            className={classes.socialIcon}
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/pr_mebel.ru/">
                                        <Instagram
                                            className={classes.socialIcon}
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com/%D0%A7%D0%B0%D1%81%D1%82%D0%BD%D1%8B%D0%B9-%D0%BC%D0%B5%D0%B1%D0%B5%D0%BB%D1%8C%D0%B5%D1%80-108136607213942">
                                        <Facebook
                                            className={classes.socialIcon}
                                        />
                                    </a>
                                </li>
                            </ul>
                        </Grid>
                    </Grid>
                </Hidden>
                <Hidden lgUp>
                    <div className={classes.innerWrapperSm}>
                        <div>
                            <Link
                                to="/"
                                className={cn(
                                    classes.logoContainer,
                                    classes.logoContainerSm
                                )}
                            >
                                <LogoHeader className={classes.logoSm} />
                            </Link>
                        </div>
                        <div>
                            <Typography className={classes.text} align="center">
                                <Link to="tel:+74952780285" external>
                                    +7 (495) 278-02-85
                                </Link>
                            </Typography>
                            <Hidden xsDown>
                                <Typography
                                    className={classes.text}
                                    align="center"
                                >
                                    <Link
                                        to="https://yandex.ru/maps/-/CCQtFQdaLA"
                                        external
                                    >
                                        м. сокол
                                    </Link>{' '}
                                    10:00 - 20:00
                                </Typography>
                            </Hidden>
                        </div>
                        <MenuIcon
                            className={classes.menuIcon}
                            onClick={handleOpenDrawer}
                        />
                    </div>
                    <Drawer
                        anchor="right"
                        open={isDrawerOpen}
                        PaperProps={{
                            classes: {
                                root: classes.drawer,
                            },
                        }}
                        onClick={handleCloseDrawer}
                        onClose={handleCloseDrawer}
                    >
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography>
                                    <Link to="/catalog">Каталог</Link>
                                </Typography>
                            </Grid>
                            <div className={classes.hl} />
                            <Grid
                                item
                                xs={12}
                                container
                                spacing={1}
                                direction="column"
                                style={{ paddingLeft: '10px' }}
                            >
                                <Grid item xs>
                                    <Typography>
                                        <Link to="/catalog?section=cupboard">
                                            Шкафы
                                        </Link>
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography>
                                        <Link to="/catalog?section=wardrobe">
                                            Гардеробные
                                        </Link>
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography>
                                        <Link to="/catalog?section=accessories">
                                            Аксессуары
                                        </Link>
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography>
                                        <Link to="/catalog?section=lightingSystems">
                                            Системы подсветки
                                        </Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <div className={classes.hl} />
                            <Grid
                                item
                                xs={12}
                                container
                                spacing={1}
                                direction="column"
                            >
                                <Grid item xs>
                                    <Typography>
                                        <Link to="/#design-offer">
                                            Рассчитать стоимость
                                        </Link>
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography>
                                        <Link to="/#advantages">
                                            Преимущества
                                        </Link>
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography>
                                        <Link to="/#about">О нас</Link>
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography>
                                        <Link to="/#contacts">Контакты</Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    className={classes.text}
                                    align="center"
                                >
                                    <Link to="tel:+74952780285" external>
                                        +7 (495) 278-02-85
                                    </Link>
                                </Typography>
                                <Typography
                                    variant="body2"
                                    className={classes.text}
                                    align="center"
                                >
                                    <Link
                                        to="https://yandex.ru/maps/-/CCQtFQdaLA"
                                        external
                                    >
                                        м. сокол
                                    </Link>
                                </Typography>
                                <Typography
                                    variant="body2"
                                    className={classes.text}
                                    align="center"
                                >
                                    10:00 - 20:00
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <ul
                                    className={cn(classes.list, classes.social)}
                                >
                                    <li>
                                        <a href="https://vk.com/public185518769">
                                            <Vkontakte
                                                className={classes.socialIcon}
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/pr_mebel.ru/">
                                            <Instagram
                                                className={classes.socialIcon}
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.facebook.com/%D0%A7%D0%B0%D1%81%D1%82%D0%BD%D1%8B%D0%B9-%D0%BC%D0%B5%D0%B1%D0%B5%D0%BB%D1%8C%D0%B5%D1%80-108136607213942">
                                            <Facebook
                                                className={classes.socialIcon}
                                            />
                                        </a>
                                    </li>
                                </ul>
                            </Grid>
                            <Grid item xs>
                                <MainButton>Заказать звонок</MainButton>
                            </Grid>
                        </Grid>
                    </Drawer>
                </Hidden>
            </Container>
        </header>
    );
};
