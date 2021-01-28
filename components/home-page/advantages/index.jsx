import React, { useCallback, useState } from 'react';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { v4 } from 'uuid';
import {
  Container,
  Typography,
  Grid,
  Hidden,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {
  BlockTitle,
  MainButton,
} from 'components/common';
import { TABS } from './constants';
import { Tabs, Options } from './components';

const useStyles = makeStyles((theme) => ({
  description: {
    marginTop: '30px',
  },
  materials: {
    marginTop: '40px',
  },
  tabs: {
    marginTop: '20px',
  },
  list: {
    margin: '0',
    marginTop: '20px',
    paddingLeft: '30px',
    listStyle: 'none',
  },
  listText: {
    fontSize: '16px',
    lineHeight: '1.2',
  },
  listItem: {
    position: 'relative',
    marginBottom: '4px',
  },
  listContainer: {
    minHeight: '175px',
  },
  check: {
    width: '20px',
    position: 'absolute',
    left: '-30px',
    top: '-3px',
    color: theme.palette.primary.main,
  },
  imgContainer: {
    position: 'relative',
    margin: 'auto',
  },
  img: {
    width: '100%',
  },
  icon: {
    position: 'absolute',
    top: '50%',
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
  iconBack: {
    left: '-30px',
  },
  iconForward: {
    right: '-30px',
  },
  buttonContainer: {
    marginTop: '32px',
  },
  [theme.breakpoints.down('xs')]: {
    buttonContainer: {
      marginTop: '20px',
    },
  },
}));

export const Advantages = () => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);

  const handleNextTab = useCallback(() => {
    setActiveTab((prev) => {
      if (prev === TABS.length - 1) {
        return 0;
      }

      return prev + 1;
    });
  }, []);

  const handlePrevTab = useCallback(() => {
    setActiveTab((prev) => {
      if (prev === 0) {
        return TABS.length - 1;
      }

      return prev - 1;
    });
  }, []);

  const handleChangeTab = useCallback((index) => {
    setActiveTab(index);
  }, []);

  return (
    <Container>
      <Hidden xsDown>
        <BlockTitle>
          <Typography variant="h4">Преимущества нашей продукции</Typography>
        </BlockTitle>
        <Grid container className={classes.description}>
          <Grid item xs={12} md={10}>
            <Typography variant="body2">
              Мы&nbsp;постоянно улучшаем качество,
              эргономические и&nbsp;эстетические параметры нашей мебели.
              Начиная с&nbsp;подбора материалов и&nbsp;комплектующих мы&nbsp;создаем
              эксклюзивный проект будущего изделия, который не&nbsp;просто идеально
              впишется в&nbsp;ваш интерьер, а&nbsp;будет комфортен, удобен и&nbsp;функционален
              в&nbsp;использовании, и&nbsp;прослужит Вам долгие годы.
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} container className={classes.materials} spacing={2}>
          <Grid item xs={12} sm={7} container direction="column">
            <Grid item>
              <BlockTitle>
                <Typography variant="h5">
                  Мы используем только премиальные
                  {' '}
                  <Hidden xsDown>
                    <br />
                  </Hidden>
                  материалы для нашей мебели
                </Typography>
              </BlockTitle>
            </Grid>
          </Grid>
          <Grid item xs={7} className={classes.tabs}>
            <Tabs tabs={TABS} activeTab={activeTab} onChange={handleChangeTab} />
            <Options activeTab={activeTab}>
              {TABS.map((tab) => (
                <div key={v4()} label={tab.title}>
                  <ul className={classes.list}>
                    {tab.list.map((option) => (
                      <li key={v4()} className={classes.listItem}>
                        <CheckIcon className={classes.check} />
                        <Typography className={classes.listText}>{option}</Typography>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Options>
          </Grid>
          <Grid item xs={5}>
            <img
              src={TABS.filter((tab, i) => i === activeTab)[0].img}
              alt="smth"
              className={classes.img}
            />
          </Grid>
        </Grid>
      </Hidden>
      <Hidden smUp>
        <Grid
          item
          xs={12}
          container
          className={classes.materials}
          direction="column"
        >
          <Grid item xs={12}>
            <BlockTitle>
              <Typography variant="h5">
                Мы используем только премиальные
                {' '}
                <Hidden xsDown>
                  <br />
                </Hidden>
                материалы для нашей мебели
              </Typography>
            </BlockTitle>
          </Grid>
          <Grid item xs={12} className={classes.tabs}>
            <Tabs tabs={TABS} activeTab={activeTab} onChange={handleChangeTab} />
          </Grid>
          <Grid
            item
            xs={10}
            className={classes.imgContainer}
          >
            <ArrowBackIosIcon
              className={cx(classes.icon, classes.iconBack)}
              onClick={handlePrevTab}
            />
            <img
              src={TABS.filter((tab, i) => i === activeTab)[0].img}
              alt="smth"
              className={classes.img}
            />
            <ArrowForwardIosIcon
              className={cx(classes.icon, classes.iconForward)}
              onClick={handleNextTab}
            />
          </Grid>
          <Grid item xs={12} className={classes.listContainer}>
            <Options activeTab={activeTab}>
              {TABS.map((tab) => (
                <ul key={tab.title} className={classes.list}>
                  {tab.list.map((option) => (
                    <li key={option} className={classes.listItem}>
                      <CheckIcon className={classes.check} />
                      <Typography className={classes.listText}>{option}</Typography>
                    </li>
                  ))}
                </ul>
              ))}
            </Options>
          </Grid>
        </Grid>
      </Hidden>
      <Grid item xs={12} container justify="center" className={classes.buttonContainer}>
        <Grid item xs={10} sm={6} md={4}>
          <MainButton>Рассчитать стоимость</MainButton>
        </Grid>
      </Grid>
    </Container>
  );
};
