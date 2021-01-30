import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid } from '@material-ui/core';
import Image from 'next/image';
import { BlockTitle, MainButton, Pagination } from 'components/common';
import { WardrobeAdditionalBlock } from '../../wardrobe-additional-block';
import { TABS, ADDITIONAL } from '../constants';

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: '26px',
  },
  img__container: {
    position: 'relative',
    paddingTop: '71.9%',
  },
  imgWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    opacity: '0',
    transition: 'opacity .3s ease-in-out',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
  },
  selectedImage: {
    opacity: '1',
  },
  point: {
    position: 'absolute',
  },
  list: {
    margin: '0',
    padding: '0',
    listStyle: 'none',
    marginTop: '40px',
  },
  list_horizontal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  option: {
    color: 'black',
    transition: 'all 1.3s linear',
    marginBottom: '16px',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  active: {
    color: theme.palette.primary.main,
  },
  text_bottom: {
    marginTop: '30px',
    minHeight: '130px',
  },
  'button-container': {
    marginTop: '32px',
  },
}));

export const WardrobeLeftSmDown = () => {
  const classes = useStyles();
  const [activePage, setActivePage] = useState(0);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleClick = useCallback((index) => () => {
    setActivePage(0);
    setActiveTabIndex(index);
  }, []);

  return (
    <Container>
      <BlockTitle>
        <Typography variant="h4">
          Комфорт и удобство, продуманное до&nbsp;мелочей
        </Typography>
      </BlockTitle>
      <Grid container justify="center">
        <Grid item xs>
          <ul className={cn(classes.list, classes.list_horizontal)}>
            {TABS.map((tab, i) => (
              <li
                key={tab.id}
                className={cn(classes.option, {
                  [classes.active]: activeTabIndex === i,
                })}
                onClick={handleClick(i)}
              >
                <Typography color="inherit" variant="h6">
                  {tab.title}
                </Typography>
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={12} className={classes.img__container}>
          {TABS.map(({ img, title, id }, i) => (
            <Image
              key={id}
              src={img}
              layout="fill"
              alt={title}
              className={cn(classes.image, {
                [classes.selectedImage]: activePage === 0 && activeTabIndex === i,
              })}
              quality={100}
            />
          ))}
          {ADDITIONAL.map(({ img, title, id }, i) => (
            <Image
              key={id}
              src={img}
              alt={title}
              className={cn(classes.image, {
                [classes.selectedImage]: activePage - 1 === i,
              })}
              layout="fill"
              objectFit="contain"
              quality={100}
            />
          ))}
        </Grid>
        <Grid item xs={12}>
          <Pagination
            list={ADDITIONAL}
            activeIndex={activePage}
            onChange={setActivePage}
          />
        </Grid>
        {activePage !== 0 ? (
          <Grid item xs={10} className={classes.text_bottom}>
            <WardrobeAdditionalBlock
              title={ADDITIONAL[activePage - 1].title}
              text={ADDITIONAL[activePage - 1].text}
            />
          </Grid>
        ) : (
          <Grid item xs={10} className={classes.text_bottom}>
            <Typography variant="body2">
              Мы&nbsp;разработали специальные решения для оптимизации
              хранения ваших вещей, которые позволяют сделать ежедневно
              пользование мебелью не&nbsp;только удобным и&nbsp;комфортным,
              но&nbsp;еще и&nbsp;приятным
            </Typography>
          </Grid>
        )}
      </Grid>
      <Grid container justify="center" className={classes['button-container']}>
        <Grid item xs={10} sm={6} md={4}>
          <MainButton>Рассчитать стоимость</MainButton>
        </Grid>
      </Grid>
    </Container>
  );
};
