import { Box, Container, Grid, Typography } from '@mui/material';
import clsx from 'clsx';
import Image from 'next/legacy/image';
import img1 from 'public/images/home-page/wardrobe-left/wardrobe-1.jpg';
import img2 from 'public/images/home-page/wardrobe-left/wardrobe-2.jpg';
import img3 from 'public/images/home-page/wardrobe-left/wardrobe-3.jpg';
import React, { FC, useCallback, useState } from 'react';

import { useYaCounter54949111 } from '@/analytics';
import {
  BlockTitle,
  Button,
  ButtonContainer,
  Pagination,
} from '@/components/common';
import { useInquiryForm } from '@/context/inquiry-form';
import { usePagination } from '@/hooks';

import { WardrobeAdditionalBlock } from '../../components';
import { ADDITIONAL, TABS } from '../texts';

export const Mobile: FC = () => {
  const { inquiryModal } = useInquiryForm();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const analytics = useYaCounter54949111();
  const { current, onReset, onSet, swipableHandlers } = usePagination({
    total: ADDITIONAL.length,
    onBeforeSet: () => analytics.track('comfort-section/anything/click'),
    onBeforeNext: () => analytics.track('comfort-section/anything/click'),
    onBeforePrev: () => analytics.track('comfort-section/anything/click'),
  });

  /**
   * Переключает вкладки по клику
   */
  const handleClick = useCallback(
    (index) => () => {
      analytics.track('comfort-section/anything/click');
      onReset();
      setActiveTabIndex(index);
    },
    [onReset, analytics],
  );

  return (
    <Container>
      <BlockTitle>
        <Typography variant="h4">
          Комфорт и удобство, продуманное до&nbsp;мелочей
        </Typography>
      </BlockTitle>
      <Grid container justifyContent="center">
        <Grid item xs>
          <Box
            sx={(theme) => ({
              margin: '0',
              padding: '0',
              listStyle: 'none',
              marginTop: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& .option': {
                color: 'black',
                transition: 'all 0.3s linear',
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
              <li
                key={tab.id}
                className={clsx('option', {
                  active: activeTabIndex === i,
                })}
                onClick={handleClick(i)}
              >
                <Typography color="inherit" variant="h6">
                  {tab.data.title}
                </Typography>
              </li>
            ))}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            position: 'relative',
            paddingTop: '71.9%',
            '& .image': {
              width: '100%',
              opacity: '0',
              transition: 'opacity .3s ease-in-out',
              height: '100%',
              position: 'absolute',
              top: '0',
              left: '0',
            },
            '& .selectedImage': {
              opacity: '1',
            },
          }}
          {...swipableHandlers}
        >
          <Image
            src={img1}
            layout="fill"
            alt="Однотонный"
            className={clsx('image', {
              selectedImage: current === 0 && activeTabIndex === 0,
            })}
            placeholder="blur"
          />
          <Image
            src={img2}
            layout="fill"
            alt="Комбинированный"
            className={clsx('image', {
              selectedImage: current === 0 && activeTabIndex === 1,
            })}
            placeholder="blur"
          />
          <Image
            src={img3}
            layout="fill"
            alt="Кобминированный с Alcantara"
            className={clsx('image', {
              selectedImage: current === 0 && activeTabIndex === 2,
            })}
            placeholder="blur"
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
              minHeight: '130px',
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
              minHeight: '130px',
            }}
          >
            <Typography variant="body2">
              Мы&nbsp;разработали специальные решения для оптимизации хранения
              ваших вещей, которые позволяют сделать ежедневно пользование
              мебелью не&nbsp;только удобным и&nbsp;комфортным, но&nbsp;еще
              и&nbsp;приятным
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
