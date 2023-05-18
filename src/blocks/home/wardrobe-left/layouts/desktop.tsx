import { Box, Container, Grid, Typography } from '@mui/material';
import clsx from 'clsx';
import Image from 'next/legacy/image';
import img1 from 'public/images/home-page/wardrobe-left/wardrobe-1.jpg';
import img2 from 'public/images/home-page/wardrobe-left/wardrobe-2.jpg';
import img3 from 'public/images/home-page/wardrobe-left/wardrobe-3.jpg';
import React, { FC, useCallback, useState } from 'react';

import { OrderFormPopup } from '@/blocks/common';
import { BlockTitle, Button, ButtonContainer } from '@/components/common';
import { useModal } from '@/hooks';

import { WardrobeSnippet } from '../../components';
import { ADDITIONAL, TABS } from '../texts';

export const Desktop: FC = () => {
    const contactFormModal = useModal();
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    /**
     * Переключает вкладки по клику
     */
    const handleClick = useCallback(
        (index) => () => {
            setActiveTabIndex(index);
        },
        []
    );

    return (
        <>
            <Container>
                <BlockTitle>
                    <Typography variant="h4">Комфорт и удобство, продуманное до&nbsp;мелочей</Typography>
                </BlockTitle>
                <Grid
                    container
                    spacing={6}
                    sx={{
                        marginTop: '26px',
                    }}
                >
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                position: 'relative',
                                paddingTop: '73%',
                                '& .image': {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    opacity: '0',
                                    top: '0',
                                    left: '0',
                                    transition: 'opacity .3s ease-in-out',
                                },
                                '& .selectedImage': {
                                    opacity: '1',
                                },
                                '& .point': {
                                    position: 'absolute',
                                },
                            }}
                        >
                            <Image
                                src={img1}
                                layout="fill"
                                alt="Однотонный"
                                className={clsx('image', {
                                    selectedImage: activeTabIndex === 0,
                                })}
                                placeholder="blur"
                            />
                            <Image
                                src={img2}
                                layout="fill"
                                alt="Комбинированный"
                                className={clsx('image', {
                                    selectedImage: activeTabIndex === 1,
                                })}
                                placeholder="blur"
                            />
                            <Image
                                src={img3}
                                layout="fill"
                                alt="Кобминированный с Alcantara"
                                className={clsx('image', {
                                    selectedImage: activeTabIndex === 2,
                                })}
                                placeholder="blur"
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
                    <Grid item xs={6}>
                        <Typography>
                            Мы&nbsp;разработали специальные решения для оптимизации хранения ваших вещей, которые
                            позволяют сделать ежедневно пользование мебелью не&nbsp;только удобным и&nbsp;комфортным,
                            но&nbsp;еще и&nbsp;приятным
                        </Typography>
                        <Box
                            component="ul"
                            sx={(theme) => ({
                                margin: '0',
                                padding: '0',
                                listStyle: 'none',
                                marginTop: '40px',
                                '& .option': {
                                    color: 'black',
                                    transition: 'all .3s ease-in-out',
                                    marginBottom: '16px',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: theme.palette.primary.main,
                                    },
                                },
                                '& .active': {
                                    color: theme.palette.primary.main,
                                },
                            })}
                        >
                            {TABS.map((tab, i) => (
                                <div
                                    key={tab.id}
                                    className={clsx('option', {
                                        active: activeTabIndex === i,
                                    })}
                                    onClick={handleClick(i)}
                                >
                                    <Typography color="inherit" variant="h6">
                                        {tab.data.title}
                                    </Typography>
                                </div>
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
            <OrderFormPopup isOpen={contactFormModal.isOpen} marker="komfort" onClose={contactFormModal.handleClose} />
        </>
    );
};
