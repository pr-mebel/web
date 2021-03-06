import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid } from '@material-ui/core';
import { BlockTitle, MainButton } from '@/components/common';
import Image from 'next/image';
import { ADDITIONAL, defaultImage } from '../constants';
import { WardrobeSnippet } from '../../wardrobe-snippet';

const useStyles = makeStyles((theme) => ({
    description: {
        marginTop: '80px',
    },
    imgContainer: {
        position: 'relative',
        paddingTop: '71.9%',
        width: '100%',
    },
    point: {
        position: 'absolute',
    },
    img: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '0',
            left: '0',
        },
    },
    'button-container': {
        marginTop: '32px',
    },
}));

export const WardrobeRightMdUp = () => {
    const classes = useStyles();

    return (
        <Container>
            <BlockTitle>
                <Typography variant="h4">
                    Исключительное качество
                    <br />
                    нашей мебели
                </Typography>
            </BlockTitle>
            <Grid container spacing={6}>
                <Grid item xs={6} className={classes.description}>
                    <Typography variant="body1">
                        Каждое наше изделие это сложный инженерный продукт, включающий в&nbsp;себя
                        передовые мировые стандарты производства мебели. Все это сделано для того,
                        чтобы наша мебель безупречно служила вам долгие годы
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.imgContainer}>
                        <Image
                            src={defaultImage}
                            alt="Шкаф исключительного качества"
                            layout="fill"
                            className={classes.img}
                        />
                        {ADDITIONAL.map((point) => (
                            <div
                                key={point.id}
                                className={classes.point}
                                style={{
                                    left: point.data.left,
                                    top: point.data.top,
                                }}
                            >
                                <WardrobeSnippet
                                    img={point.data.img}
                                    title={point.data.title}
                                    text={point.data.text}
                                    direction={point.data.direction}
                                />
                            </div>
                        ))}
                    </div>
                </Grid>
            </Grid>
            <Grid container justify="center" className={classes['button-container']}>
                <Grid item xs={10} sm={6} md={4}>
                    <MainButton>Рассчитать стоимость</MainButton>
                </Grid>
            </Grid>
        </Container>
    );
};
