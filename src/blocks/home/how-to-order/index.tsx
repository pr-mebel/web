import { Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';

import { OrderFormPopup } from '@/blocks/common';
import { BlockTitle, Button, ButtonContainer } from '@/components';
import { useModal } from '@/hooks';

import { Desktop } from './layouts/desktop';
import { Mobile } from './layouts/mobile';

export const HowToOrder: FC = () => {
    const theme = useTheme();
    const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
    const contactFormModal = useModal();

    return (
        <>
            <Container>
                <BlockTitle>
                    <Typography variant="h4">Как заказать нашу мебель</Typography>
                </BlockTitle>
                {isSmDown ? <Mobile /> : <Desktop />}
                <ButtonContainer
                    sx={{
                        marginTop: '36px',
                        '@media (max-width: 960px)': {
                            marginTop: '18px',
                        },
                    }}
                >
                    <Button block onClick={() => contactFormModal.handleOpen()}>
                        Оставить заявку
                    </Button>
                </ButtonContainer>
            </Container>
            <OrderFormPopup isOpen={contactFormModal.isOpen} marker="zakazat" onClose={contactFormModal.handleClose} />
        </>
    );
};
