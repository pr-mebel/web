import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { FC } from 'react';

import { BlockTitle, ButtonContainer, MainButton } from '@/components';

import { CatalogCard } from './components';
import { CATALOG } from './constants';

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
            <div className={classes.buttonContainer}>
                <ButtonContainer>
                    <MainButton>Рассчитать стоимость</MainButton>
                </ButtonContainer>
            </div>
        </Container>
    );
};
