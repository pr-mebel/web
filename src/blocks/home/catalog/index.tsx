import { Box, Container, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';

import { OrderFormPopup } from '@/blocks/common';
import { BlockTitle, Button, ButtonContainer } from '@/components';
import { useModal } from '@/hooks';

import { CatalogCard } from './components';
import { CATALOG } from './constants';

export const Catalog: FC = () => {
    const contactFormModal = useModal();

    return (
        <>
            <Container>
                <BlockTitle
                    sx={(theme) => ({
                        marginBottom: '60px',
                        [theme.breakpoints.down('sm')]: {
                            marginBottom: '40px',
                        },
                    })}
                >
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
                <Box
                    sx={{
                        marginTop: '30px',
                    }}
                >
                    <ButtonContainer>
                        <Button block onClick={() => contactFormModal.handleOpen()}>
                            Рассчитать стоимость
                        </Button>
                    </ButtonContainer>
                </Box>
            </Container>
            <OrderFormPopup isOpen={contactFormModal.isOpen} onClose={contactFormModal.handleClose} />
        </>
    );
};
