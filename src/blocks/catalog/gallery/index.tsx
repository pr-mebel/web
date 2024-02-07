import { Box, Container, Grid, Skeleton, Typography } from '@mui/material';
import { range } from 'lodash';
import React, { FC } from 'react';

import { Button, ButtonContainer } from '@/components';

import { Card } from './components';

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
    if (!items.length && !isLoading) {
        return (
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '200px',
                    }}
                >
                    <Typography align="center">
                        По заданному фильтру ничего не найдено. Пожалуйста, поменяйте запрос.
                    </Typography>
                </Box>
            </Container>
        );
    }

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
                {isLoading &&
                    range(12).map((val) => (
                        <Grid key={val} item xs={12} sm={6} md={4}>
                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                sx={{
                                    paddingTop: '66.66%',
                                }}
                            />
                        </Grid>
                    ))}
            </Grid>
            {!!hasMore && (
                <ButtonContainer
                    sx={(theme) => ({
                        marginTop: '60px',
                        [theme.breakpoints.down('sm')]: {
                            marginTop: '30px',
                        },
                    })}
                >
                    <Button block onClick={onLoadMore}>
                        Показать еще
                    </Button>
                </ButtonContainer>
            )}
        </Container>
    );
};
