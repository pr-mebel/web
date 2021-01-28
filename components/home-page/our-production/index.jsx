import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  Container,
  Typography,
  Grid,
  Hidden,
} from '@material-ui/core';
import {
  BlockTitle,
  MainButton,
  Pagination,
} from 'components/common';
import { LIST } from './constants';

const useStyles = makeStyles((theme) => ({
  img: {
    marginTop: '30px',
    width: '100%',
    marginBottom: '24px',
  },
  section__title: {
    fontSize: '16px',
    lineHeight: '18px',
    fontWeight: '400',
  },
  text: {
    marginTop: '24px',
    fontSize: '15px',
  },
  text__container_bottom: {
    marginTop: '24px',
  },
  text_bottom: {
    fontSize: '24px',
    lineHeight: '28px',
  },
  content_sm: {
    minHeight: '114px',
  },
  'button-container': {
    marginTop: '30px',
    [theme.breakpoints.down('xs')]: {
      marginTop: '50px',
    },
  },
  'bottom-title': {
    marginTop: '30px',
  },
}));

export const OurProduction = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Container>
      <BlockTitle>
        <Typography variant="h4">
          Наше производство
        </Typography>
      </BlockTitle>
      <img src="images/home-page/our-production/1.jpg" alt="Производство" className={classes.img} />
      <Grid
        container
        spacing={isXsDown ? 2 : 4}
      >
        <Hidden xsDown>
          {LIST.map((item) => (
            <Grid key={item.title} item xs={6} md={3}>
              <BlockTitle>
                <Typography variant="h6" className={classes.section__title}>
                  {item.title}
                </Typography>
              </BlockTitle>
              <Typography className={classes.text} variant="body2">
                {item.text}
              </Typography>
            </Grid>
          ))}
        </Hidden>
        <Hidden smUp>
          <Grid item xs={12} className={classes.content_sm}>
            <BlockTitle>
              <Typography variant="h5">
                {LIST[activeIndex].title}
              </Typography>
            </BlockTitle>
            <Typography variant="body2" className={classes.text}>
              {LIST[activeIndex].text}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Pagination
              list={LIST}
              activeIndex={activeIndex}
              onChange={setActiveIndex}
            />
          </Grid>
        </Hidden>
        <Grid container justify="center">
          <Grid item xs={12} md={10}>
            <Typography variant="h5" className={classes['bottom-title']} align="center">
              Современные технологии производства для идеального качества вашей мебели
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes['button-container']}>
          <Grid item xs={10} sm={6} md={4}>
            <MainButton>Получить проект</MainButton>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
