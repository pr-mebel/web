import React, { FC, useCallback } from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { changePage, fetchCatalog } from '@/redux';
import { MainButton, Loader } from '@/components/common';
import { Card } from './components';
import { GalleryProps } from './types';

const useStyles = makeStyles((theme) => ({
    buttonContainer: {
        marginTop: '60px',
    },
    [theme.breakpoints.down('xs')]: {
        buttonContainer: {
            marginTop: '30px',
        },
    },
}));

export const Gallery: FC<GalleryProps> = ({ items, isLoading, hasMore, page, onCardClick }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleLoadMore = useCallback(() => {
        if (!isLoading && hasMore) {
            dispatch(changePage(page + 1));
            dispatch(fetchCatalog());
        }
    }, [isLoading, hasMore, dispatch, page]);

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
                        <MainButton onClick={handleLoadMore}>Показать еще</MainButton>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};
