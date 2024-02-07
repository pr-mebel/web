import { Container, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';

import { Button, ButtonContainer } from '@/components/common';
import { useInquiryForm } from '@/context/inquiry-form';

import { Desktop } from './layouts/desktop';
import { Mobile } from './layouts/mobile';

export const Advantages: FC = () => {
    const theme = useTheme();
    const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { inquiryModal } = useInquiryForm();

    return (
        <Container>
            {isSmDown ? <Mobile /> : <Desktop />}
            <ButtonContainer
                sx={{
                    marginTop: isSmDown ? '20px' : '32px',
                }}
            >
                <Button block onClick={() => inquiryModal.handleOpen({})}>
                    Рассчитать стоимость
                </Button>
            </ButtonContainer>
        </Container>
    );
};
