import { Box, Container, Grid, Typography } from '@mui/material';
import Image from 'next/legacy/image';
import defaultImage from 'public/images/home-page/wardrobe-right/wardrobe-1.jpg';
import React from 'react';

import { OrderFormPopup } from '@/blocks/common';
import { BlockTitle, Button, ButtonContainer } from '@/components/common';
import { useModal } from '@/hooks';

import { WardrobeSnippet } from '../../components';
import { ADDITIONAL } from '../texts';

export const Desktop = () => {
    const contactFormModal = useModal();

    return (
        <>
            <Container>
                <BlockTitle>
                    <Typography variant="h4">
                        Исключительное качество
                        <br />
                        нашей мебели
                    </Typography>
                </BlockTitle>
                <Grid container spacing={6}>
                    <Grid
                        item
                        xs={6}
                        sx={{
                            marginTop: '80px',
                        }}
                    >
                        <Typography variant="body1">
                            Каждое наше изделие это сложный инженерный продукт, включающий
                            в&nbsp;себя передовые мировые стандарты производства мебели. Все это
                            сделано для того, чтобы наша мебель безупречно служила вам долгие годы
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            sx={(theme) => ({
                                position: 'relative',
                                paddingTop: '71.9%',
                                width: '100%',
                                '& .img': {
                                    width: '100%',
                                    [theme.breakpoints.down('md')]: {
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                        top: '0',
                                        left: '0',
                                    },
                                },
                                '& .point': {
                                    position: 'absolute',
                                },
                            })}
                        >
                            <Image
                                src={defaultImage}
                                alt="Шкаф исключительного качества"
                                layout="fill"
                                placeholder="blur"
                                className="img"
                            />
                            {ADDITIONAL.map((point) => (
                                <Box
                                    key={point.id}
                                    className="point"
                                    sx={{
                                        left: point.data.left,
                                        top: point.data.top,
                                    }}
                                >
                                    <WardrobeSnippet
                                        img={point.data.img}
                                        title={point.data.title}
                                        text={point.data.text}
                                        direction={point.data.direction}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
                <ButtonContainer
                    sx={{
                        marginTop: '32px',
                    }}
                >
                    <Button block onClick={() => contactFormModal.handleOpen()}>
                        Рассчитать стоимость
                    </Button>
                </ButtonContainer>
            </Container>
            <OrderFormPopup
                isOpen={contactFormModal.isOpen}
                onClose={contactFormModal.handleClose}
            />
        </>
    );
};
