import React, { FC } from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MainButton, Loader } from '@/components/common';
import { Card } from './components';
import { GalleryProps } from './types';

const useStyles = makeStyles((theme) => ({
    buttonContainer: {
        marginTop: '60px',
    },
    notFound: {
        minHeight: '300px',
    },
    [theme.breakpoints.down('xs')]: {
        buttonContainer: {
            marginTop: '30px',
        },
    },
}));

export const Gallery: FC<GalleryProps> = ({ items, isLoading, hasMore, onCardClick, onLoadMore }) => {
    const classes = useStyles();

    console.log(items);

    return (
        <Container>
            <Grid container spacing={3}>
                {items.map((item, i) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card
                            imageUrlMin={item.imageMinified.url}
                            collection={item.collection}
                            currentItemId={i}
                            onClick={onCardClick}
                        />
                    </Grid>
                ))}
                {isLoading && <Loader />}
            </Grid>
            {!!hasMore && (
                <Grid container justify="center" className={classes.buttonContainer}>
                    <Grid item xs={10} sm={8} md={6}>
                        <MainButton onClick={onLoadMore}>Показать еще</MainButton>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};
