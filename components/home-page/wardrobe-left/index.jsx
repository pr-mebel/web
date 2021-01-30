import React, { useState, useCallback, useEffect } from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Grid,
  Hidden,
} from '@material-ui/core';
import { v4 } from 'uuid';
import { BlockTitle, MainButton, Pagination } from 'components/common';
import { WardrobeAdditionalBlock } from '../wardrobe-additional-block';
import { WardrobeSnippet } from '../wardrobe-snippet';
import { TABS, ADDITIONAL } from './constants';

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
  img: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: '0',
      left: '0',
    },
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
    transition: 'all .3s ease-in-out',
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

export const WardrobeLeft = () => {
  const classes = useStyles();
  const [activePage, setActivePage] = useState(0);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [currentImg, setCurrentImg] = useState(TABS[0].img);

  const handleClick = useCallback((index) => () => {
    setActivePage(0);
    setActiveTabIndex(index);
  }, []);

  useEffect(() => {
    if (activePage === 0) {
      setCurrentImg(TABS[activeTabIndex].img);
    } else {
      setCurrentImg(ADDITIONAL[activePage - 1].img);
    }
  }, [activePage, activeTabIndex]);

  return (
    <Container>
      <BlockTitle>
        <Typography variant="h4">
          Комфорт и удобство, продуманное до&nbsp;мелочей
        </Typography>
      </BlockTitle>
      <Hidden smDown>
        <Grid container spacing={6} className={classes.content}>
          <Grid item xs={6} className={classes.imgContainerLarge}>
            <div className={classes.imgWrapper}>
              <img
                src={currentImg}
                alt="шкаф"
                className={classes.img}
              />
              {ADDITIONAL.map((point) => (
                <div
                  key={v4()}
                  className={classes.point}
                  style={{
                    left: point.left,
                    top: point.top,
                  }}
                >
                  <WardrobeSnippet
                    img={point.img}
                    title={point.title}
                    text={point.text}
                    direction={point.direction}
                  />
                </div>
              ))}
            </div>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              Мы&nbsp;разработали специальные решения для оптимизации
              хранения ваших вещей, которые позволяют сделать ежедневно
              пользование мебелью не&nbsp;только удобным и&nbsp;комфортным,
              но&nbsp;еще и&nbsp;приятным
            </Typography>
            <ul className={classes.list}>
              {TABS.map((tab, i) => (
                <li
                  key={v4()}
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
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid container justify="center">
          <Grid item xs>
            <ul className={cn(classes.list, classes.list_horizontal)}>
              {TABS.map((tab, i) => (
                <li
                  key={v4()}
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
            <img
              src={currentImg}
              alt="шкаф"
              className={classes.img}
            />
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
      </Hidden>
      <Grid container justify="center" className={classes['button-container']}>
        <Grid item xs={10} sm={6} md={4}>
          <MainButton>Рассчитать стоимость</MainButton>
        </Grid>
      </Grid>
    </Container>
  );
};
