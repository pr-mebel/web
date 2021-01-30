import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Container, Typography, Grid } from '@material-ui/core';
import { v4 } from 'uuid';
import { BlockTitle } from 'components/common';
import { CARDS } from './constants';
import { Card } from './components';

const useStyles = makeStyles({
  root: {

  },
  title_middle: {
    marginTop: '30px',
    fontWeight: '400',
  },
  grid: {
    marginTop: '14px',
  },
});

export const About = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className={classes.root}>
      <Container>
        <BlockTitle>
          <Typography variant="h4">
            О нас
          </Typography>
        </BlockTitle>
        <Typography variant="h5" align="center" className={classes.title_middle}>
          Почему нас выбрали уже более 10 000 клиентов?
        </Typography>
        <Grid container spacing={isXsDown ? 2 : 4} className={classes.grid}>
          {CARDS.map((card) => (
            <Grid item xs={10} sm={6} md={4} key={v4()}>
              <Card
                Img={card.img}
                title={card.title}
                text={card.text}
              />
            </Grid>
          ))}
        </Grid>
        <Typography variant="h5" align="center" className={classes.title_middle}>
          Приходите, нам есть чем вас удивить!
        </Typography>
      </Container>
    </div>
  );
};
