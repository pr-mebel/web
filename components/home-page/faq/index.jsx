import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { BlockTitle, MainButton } from 'components/common';
import { LIST } from './constants';

const useStyles = makeStyles((theme) => ({
  listContainer: {
    marginTop: '30px',
  },
  summaryContainer: {
    alignItems: 'center',
  },
  number: {
    fontSize: '40px',
    color: theme.palette.primary.main,
    marginRight: '20px',
  },
  dropdownIcon: {
    color: theme.palette.primary.main,
    transform: 'rotate(90deg)',
  },
  buttonContainer: {
    marginTop: '30px',
  },
}));

export const FAQ = () => {
  const classes = useStyles();
  const [isShowMoreClicked, setIsShowMoreClicked] = useState(false);
  const [expandedList, setExpandedList] = useState(LIST.reduce((acc, v) => ({
    ...acc,
    [v.title]: false,
  }), {}));

  const handleShowMore = useCallback(() => {
    setIsShowMoreClicked(true);
  }, []);

  const handleChange = useCallback((title) => (_, expanded) => {
    if (expanded) {
      setExpandedList(LIST.reduce((acc, v) => ({
        ...acc,
        [v.title]: v.title === title,
      }), {}));
    } else {
      setExpandedList(LIST.reduce((acc, v) => ({
        ...acc,
        [v.title]: false,
      }), {}));
    }
  }, []);

  return (
    <Container>
      <BlockTitle>
        <Typography variant="h4">
          Часто задаваемые вопросы
        </Typography>
      </BlockTitle>
      <Grid container spacing={3} direction="column" alignItems="center" className={classes.listContainer}>
        {LIST.map((item, i) => {
          if (i > 4 && !isShowMoreClicked) return null;

          return (
            <Grid item xs={12} md={10} key={item.title}>
              <Accordion
                className={classes.accordion}
                onChange={handleChange(item.title)}
                expanded={expandedList[item.title]}
              >
                <AccordionSummary
                  expandIcon={<ArrowForwardIosIcon className={classes.dropdownIcon} />}
                  classes={{
                    content: classes.summaryContainer,
                  }}
                >
                  <Typography className={classes.number}>{item.id}</Typography>
                  <Typography>{item.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{item.text}</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          );
        })}
      </Grid>
      {/* <Grid container className={classes.container} spacing={3}>
        {LIST.map((item) => (
          <React.Fragment key={item.title}>
            <Hidden smDown><Grid item md={2} /></Hidden>
            <Grid item xs={12} md={8}>
              <Question
                id={item.id}
                title={item.title}
              >
                {item.text}
              </Question>
            </Grid>
            <Hidden smDown><Grid item md={2} /></Hidden>
          </React.Fragment>
        ))}
      </Grid> */}
      {!isShowMoreClicked && (
        <Grid container justify="center" className={classes.buttonContainer}>
          <Grid item xs={10} sm={6} md={4}>
            <MainButton onClick={handleShowMore}>Показать еще</MainButton>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};
