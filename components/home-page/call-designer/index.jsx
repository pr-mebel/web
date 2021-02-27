import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid, Hidden } from '@material-ui/core';
import { BlockTitle } from 'components/common';
import Img1 from './assets/img1.svg';
import Img2 from './assets/img2.svg';
import Img3 from './assets/img3.svg';
import Img4 from './assets/img4.svg';
import Img5 from './assets/img5.svg';

const useStyles = makeStyles((theme) => ({
    img: {
        height: '50px',
        marginBottom: '16px',
        '& path': {
            fill: theme.palette.primary.main,
        },
        [theme.breakpoints.down('xs')]: {
            width: '35px',
            height: '35px',
            marginBottom: '0',
        },
    },
    container: {
        marginTop: '30px',
    },
    row: {
        marginTop: '30px',
        [theme.breakpoints.down('xs')]: {
            marginTop: '0',
        },
    },
}));

export const CallDesigner = () => {
    const classes = useStyles();

    return (
        <Container>
            <BlockTitle>
                <Typography variant="h4">Закажите выезд дизайнера-замерщика сегодня</Typography>
                <Hidden xsDown>
                    <Typography variant="h5">
                        и получите проект мебели в течение 24 часов
                    </Typography>
                </Hidden>
            </BlockTitle>
            <Hidden xsDown>
                <Grid container className={classes.container}>
                    <Grid item xs={4} container direction="column" alignItems="center">
                        <Img1 className={classes.img} />
                        <Typography variant="body2" align="center">
                            Приедет в удобное для вас время
                        </Typography>
                    </Grid>
                    <Grid item xs={4} container direction="column" alignItems="center">
                        <Img2 className={classes.img} />
                        <Typography variant="body2" align="center">
                            Привезет нужные материалы
                        </Typography>
                    </Grid>
                    <Grid item xs={4} container direction="column" alignItems="center">
                        <Img3 className={classes.img} />
                        <Typography variant="body2" align="center">
                            Сделает профессиональный замер помещение
                        </Typography>
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={8} container className={classes.row} spacing={4}>
                        <Grid item xs={1} />
                        <Grid item xs={5} container direction="column" alignItems="center">
                            <Img4 className={classes.img} />
                            <Typography variant="body2" align="center">
                                Объяснит, как лучше использовать пространство вашего помещения
                            </Typography>
                        </Grid>
                        <Grid item xs={5} container direction="column" alignItems="center">
                            <Img5 className={classes.img} />
                            <Typography variant="body2" align="center">
                                Разработает дизайн-проект мебели в 3D в течение 24 часов после
                                замера
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Hidden>
            <Hidden smUp>
                <Grid
                    container
                    className={classes.container}
                    direction="column"
                    alignItems="flex-start"
                    spacing={1}
                >
                    <Grid item xs={10} container direction="row" alignItems="center">
                        <Grid item xs={2}>
                            <Img1 className={classes.img} />
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="body2">Приедет в удобное для вас время</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={10} container alignItems="center">
                        <Grid item xs={2}>
                            <Img2 className={classes.img} />
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="body2">Привезет нужные материалы</Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={10}
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Grid item xs={2}>
                            <Img3 className={classes.img} />
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="body2">
                                Сделает профессиональный замер помещение
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={10} container alignItems="center">
                        <Grid item xs={2}>
                            <Img4 className={classes.img} />
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="body2">
                                Объяснит, как лучше использовать пространство вашего помещения
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={10} container alignItems="center">
                        <Grid item xs={2}>
                            <Img5 className={classes.img} />
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="body2">
                                Разработает дизайн-проект мебели в 3D в течение 24 часов после
                                замера
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Hidden>
        </Container>
    );
};
