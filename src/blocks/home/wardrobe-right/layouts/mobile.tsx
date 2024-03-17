import { Container, Grid, Typography } from '@mui/material';
import clsx from 'clsx';
import Image from 'next/legacy/image';
import defaultImage from 'public/images/home-page/wardrobe-right/wardrobe-1.jpg';
import React from 'react';

import { useYaCounter54949111 } from '@/analytics';
import { BlockTitle, Button, ButtonContainer, Pagination } from '@/components/common';
import { useInquiryForm } from '@/context/inquiry-form';
import { usePagination } from '@/hooks';

import { WardrobeAdditionalBlock } from '../../components';
import { ADDITIONAL } from '../texts';

export const Mobile = () => {
    const { inquiryModal } = useInquiryForm();
    const analytics = useYaCounter54949111();
    const { current, onSet, swipableHandlers } = usePagination({
        total: ADDITIONAL.length,
        onBeforeSet: () => analytics.track('quality-section/anything/click'),
        onBeforeNext: () => analytics.track('quality-section/anything/click'),
        onBeforePrev: () => analytics.track('quality-section/anything/click'),
    });

    return (
        <Container>
            <BlockTitle>
                <Typography variant="h4">
                    Исключительное качество
                    <br />
                    нашей мебели
                </Typography>
            </BlockTitle>
            <Grid
                container
                justifyContent="center"
                sx={{
                    marginTop: '40px',
                }}
            >
                <Grid
                    item
                    xs={12}
                    sx={{
                        position: 'relative',
                        paddingTop: '71.9%',
                        '& .image': {
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            opacity: '0',
                            transition: 'opacity .3s ease-in-out',
                        },
                        '& .selectedImage': {
                            opacity: '1',
                        },
                    }}
                    {...swipableHandlers}
                >
                    <Image
                        src={defaultImage}
                        layout="fill"
                        alt="Шкаф исключительного качества"
                        placeholder="blur"
                        className={clsx('image', {
                            selectedImage: current === 0,
                        })}
                        quality={100}
                    />
                    {ADDITIONAL.map(({ data: { img, title }, id }, i) => (
                        <Image
                            key={id}
                            src={img}
                            alt={title}
                            className={clsx('image', {
                                selectedImage: current - 1 === i,
                            })}
                            layout="fill"
                            objectFit="contain"
                            quality={100}
                        />
                    ))}
                </Grid>
                <Grid item xs={12}>
                    <Pagination
                        numberOfPages={ADDITIONAL.length + 1}
                        activeIndex={current}
                        onChange={onSet}
                    />
                </Grid>
                {current !== 0 ? (
                    <Grid
                        item
                        xs={10}
                        sx={{
                            marginTop: '30px',
                            minHeight: '120px',
                        }}
                    >
                        <WardrobeAdditionalBlock
                            title={ADDITIONAL[current - 1].data.title}
                            text={ADDITIONAL[current - 1].data.text}
                        />
                    </Grid>
                ) : (
                    <Grid
                        item
                        xs={10}
                        sx={{
                            marginTop: '30px',
                            minHeight: '120px',
                        }}
                    >
                        <Typography variant="body2">
                            Каждое наше изделие это сложный инженерный продукт, включающий
                            в&nbsp;себя передовые мировые стандарты производства мебели. Все это
                            сделано для того, чтобы наша мебель безупречно служила вам долгие годы
                        </Typography>
                    </Grid>
                )}
            </Grid>
            <ButtonContainer
                sx={{
                    marginTop: '32px',
                }}
            >
                <Button block onClick={() => inquiryModal.handleOpen({})}>
                    Рассчитать стоимость
                </Button>
            </ButtonContainer>
        </Container>
    );
};
