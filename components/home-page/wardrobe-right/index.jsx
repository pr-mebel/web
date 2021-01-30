import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Grid,
  Hidden,
} from '@material-ui/core';
import { BlockTitle, MainButton, Pagination } from 'components/common';
import { v4 } from 'uuid';
import { ADDITIONAL } from './constants';
import { WardrobeAdditionalBlock } from '../wardrobe-additional-block';
import { WardrobeSnippet } from '../wardrobe-snippet';

const defaultImage = 'images/home-page/wardrobe-right/wardrobe-1.jpg';

const useStyles = makeStyles((theme) => ({
  content_sm: {
    marginTop: '40px',
  },
  description: {
    marginTop: '80px',
  },
  img__container: {
    position: 'relative',
    paddingTop: '71.9%',
  },
  imgWrapper: {
    position: 'relative',
  },
  point: {
    position: 'absolute',
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
  text_bottom: {
    marginTop: '30px',
    minHeight: '120px',
  },
  'button-container': {
    marginTop: '32px',
  },
}));

export const WardrobeRight = () => {
  const classes = useStyles();
  const [activePage, setActivePage] = useState(0);
  const [currentImg, setCurrentImg] = useState(defaultImage);

  useEffect(() => {
    if (activePage === 0) {
      setCurrentImg(defaultImage);
    } else {
      setCurrentImg(ADDITIONAL[activePage - 1].img);
    }
  }, [activePage]);

  return (
    <Container>
      <BlockTitle>
        <Typography variant="h4">
          Исключительное качество
          <br />
          нашей мебели
        </Typography>
      </BlockTitle>
      <Hidden smDown>
        <Grid container spacing={6} className={classes.content}>
          <Grid item xs={6} className={classes.description}>
            <Typography variant="body1">
              Каждое наше изделие это сложный инженерный продукт,
              включающий в&nbsp;себя передовые мировые стандарты производства
              мебели. Все это сделано для того, чтобы наша мебель
              безупречно служила вам долгие годы
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.imgWrapper}>
              <img
                src={defaultImage}
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
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid container justify="center" className={classes.content_sm}>
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
                Каждое наше изделие это сложный инженерный продукт,
                включающий в&nbsp;себя передовые мировые стандарты производства
                мебели. Все это сделано для того, чтобы наша мебель
                безупречно служила вам долгие годы
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
