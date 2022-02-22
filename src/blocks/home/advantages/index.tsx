import { Container, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';

import { Button, ButtonContainer } from '@/components/common';
import { useContactFormModal } from '@/hooks';

import { Desktop } from './layouts/desktop';
import { Mobile } from './layouts/mobile';

export const Advantages: FC = () => {
    const theme = useTheme();
    const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
    const contactFormModal = useContactFormModal();

    return (
        <Container>
            {isSmDown ? <Mobile /> : <Desktop />}
            <ButtonContainer
                sx={{
                    marginTop: isSmDown ? '20px' : '32px',
                }}
            >
                <Button block onClick={() => contactFormModal.onOpen('preim')}>
                    Рассчитать стоимость
                </Button>
            </ButtonContainer>
        </Container>
    );
};
