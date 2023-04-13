import { Container, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';

import { OrderFormPopup } from '@/blocks/common';
import { Button, ButtonContainer } from '@/components/common';
import { useModal } from '@/hooks';

import { Desktop } from './layouts/desktop';
import { Mobile } from './layouts/mobile';

export const Advantages: FC = () => {
    const theme = useTheme();
    const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
    const contactFormModal = useModal();

    return (
        <>
            <Container>
                {isSmDown ? <Mobile /> : <Desktop />}
                <ButtonContainer
                    sx={{
                        marginTop: isSmDown ? '20px' : '32px',
                    }}
                >
                    <Button block onClick={() => contactFormModal.handleOpen()}>
                        Рассчитать стоимость
                    </Button>
                </ButtonContainer>
            </Container>
            <OrderFormPopup isOpen={contactFormModal.isOpen} marker="preim" onClose={contactFormModal.handleClose} />
        </>
    );
};
