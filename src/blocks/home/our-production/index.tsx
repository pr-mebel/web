import { Box, Container, Grid, Typography } from '@mui/material';
import Image from 'next/legacy/image';
import img from 'public/images/home-page/our-production/1.jpg';
import React, { FC } from 'react';

import { BlockTitle, Button, ButtonContainer } from '@/components';
import { useInquiryForm } from '@/context/inquiry-form';

import { LIST } from './texts';

export const OurProduction: FC = () => {
    const { inquiryModal } = useInquiryForm();

    return (
        <Container>
            <BlockTitle>
                <Typography variant="h4">Наше производство</Typography>
            </BlockTitle>
            <Box
                sx={{
                    marginTop: '30px',
                    width: '100%',
                    marginBottom: '24px',
                    position: 'relative',
                    paddingTop: '30%',
                }}
            >
                <Image src={img} alt="Производство" layout="fill" placeholder="blur" />
            </Box>
            <Box
                sx={(theme) => ({
                    display: 'grid',
                    gap: '18px',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    [theme.breakpoints.down('md')]: {
                        gridTemplateColumns: '1fr 1fr',
                    },
                    [theme.breakpoints.down('sm')]: {
                        gridTemplateColumns: '1fr',
                    },
                    '& .sectionTitle': {
                        fontSize: '16px',
                        lineHeight: '18px',
                        fontWeight: 400,
                        whiteSpace: 'pre-line',
                        [theme.breakpoints.down('sm')]: {
                            whiteSpace: 'initial',
                        },
                    },
                    '& .text': {
                        marginTop: '24px',
                        fontSize: '15px',
                        [theme.breakpoints.down('sm')]: {
                            marginTop: '4px',
                        },
                    },
                })}
            >
                {LIST.map((item) => (
                    <div key={item.id}>
                        <BlockTitle>
                            <Typography variant="h6" className="sectionTitle">
                                {item.data.title}
                            </Typography>
                        </BlockTitle>
                        <Typography className="text" variant="body2">
                            {item.data.text}
                        </Typography>
                    </div>
                ))}
            </Box>
            <Grid item xs={12} container justifyContent="center">
                <Grid item xs={12} md={10}>
                    <Typography
                        variant="h5"
                        sx={{
                            marginTop: '30px',
                        }}
                        align="center"
                    >
                        Современные технологии производства для идеального качества вашей мебели
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                item
                xs={12}
                sx={{
                    marginTop: '10px',
                }}
            >
                <ButtonContainer>
                    <Button block onClick={() => inquiryModal.handleOpen({})}>
                        Получить проект
                    </Button>
                </ButtonContainer>
            </Grid>
        </Container>
    );
};
