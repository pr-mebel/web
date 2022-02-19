import { Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';

export const TextBlock: FC = () => {
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

    if (isMdDown) {
        return null;
    }

    return (
        <Container>
            <Typography variant="body1">
                Независимо от&nbsp;того, какой стиль исполнения гардеробной вы&nbsp;выберите, будь&nbsp;то элегантная
                классика или идущий в&nbsp;ногу со&nbsp;временем модерн, мы&nbsp;гарантируем предоставить вам
                безупречный сервис, максимально функциональный и&nbsp;эргономичный дизайн, премиальные материалы, более
                1000 вариантов отделки и&nbsp;абсолютную точность изготовления и&nbsp;монтажа. Архитектурный подход
                к&nbsp;системам хранения и&nbsp;внимание к&nbsp;деталям, позволяют нам создавать поистине невероятные
                шедевры гардеробных систем.
            </Typography>
        </Container>
    );
};
