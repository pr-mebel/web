import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid } from '@material-ui/core';
import { BlockTitle, MainButton } from '../../common';
import { CATALOG } from './constants';
import { CatalogCard } from './components';

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: '60px',
    },
    buttonContainer: {
        marginTop: '30px',
    },
    [theme.breakpoints.down('xs')]: {
        title: {
            marginBottom: '40px',
        },
    },
}));

export const Catalog: FC = () => {
    const classes = useStyles();

    return (
        <Container>
            <BlockTitle className={classes.title}>
                <Typography variant="h4">Каталог</Typography>
            </BlockTitle>
            <Grid container spacing={4}>
                {CATALOG.map((item, id) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <CatalogCard
                            cardID={id}
                            title={item.data.title}
                            subtitle={item.data.subtitle}
                            caption={item.data.caption}
                            href={item.data.href}
                        />
                    </Grid>
                ))}
            </Grid>
            <Grid
                container
                justifyContent="center"
                className={classes.buttonContainer}
            >
                <Grid item xs={10} sm={6} md={4}>
                    <MainButton>Рассчитать стоимость</MainButton>
                </Grid>
            </Grid>
        </Container>
    );
};
