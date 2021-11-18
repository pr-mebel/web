import React, { FC } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MainButton, Loader } from '@/components/common';
import { Card } from './components';

const useStyles = makeStyles((theme) => ({
    buttonContainer: {
        marginTop: '60px',
    },
    notFound: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
    },
    [theme.breakpoints.down('xs')]: {
        buttonContainer: {
            marginTop: '30px',
        },
    },
}));

type GalleryProps = {
    items: {
        id: string;
        imageMinified: {
            url: string;
        };
        collection: string;
    }[];
    isLoading: boolean;
    hasMore: boolean;
    onCardClick: (cardID: number) => void;
    onLoadMore: () => void;
};


export const Gallery: FC<GalleryProps> = ({
    items,
    isLoading,
    hasMore,
    onCardClick,
    onLoadMore,
}) => {
    const classes = useStyles();

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
            {items.length === 0 && !isLoading && (
                <div className={classes.notFound}>
                    <Typography align='center'>
                        По заданному фильтру ничего не найдено. Пожалуйста, поменяйте запрос.
                    </Typography>
                </div>
            )}
            {!!hasMore && (
                <Grid container justifyContent="center" className={classes.buttonContainer}>
                    <Grid item xs={10} sm={8} md={6}>
                        <MainButton onClick={onLoadMore}>Показать еще</MainButton>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};
