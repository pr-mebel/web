import { Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';

import { BlockTitle, Button, ButtonContainer } from '@/components';
import { useContactFormModal } from '@/hooks';

import { Desktop } from './layouts/desktop';
import { Mobile } from './layouts/mobile';

export const HowToOrder: FC = () => {
    const theme = useTheme();
    const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
    const contactFormModal = useContactFormModal();

    return (
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
                <Button block onClick={contactFormModal.onOpen}>
                    Оставить заявку
                </Button>
            </ButtonContainer>
        </Container>
    );
};
