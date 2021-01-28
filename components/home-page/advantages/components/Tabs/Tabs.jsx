import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tabs: {
    margin: '0',
    padding: '0',
    listStyle: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  tab: {
    marginRight: '30px',
    lineHeight: '25px',
    position: 'relative',
    transition: 'all .3s',
    cursor: 'pointer',
    '&:after': {
      position: 'absolute',
      fontSize: '20px',
      fontWeight: '300',
      color: 'black',
      content: '"/"',
      right: '-20px',
      bottom: '0',
    },
    '&:last-of-type&:after': {
      display: 'none',
    },
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  active: {
    cursor: 'default',
    color: theme.palette.primary.main,
  },
}));

export const Tabs = ({
  activeTab,
  tabs,
  onChange,
}) => {
  const classes = useStyles();

  const handeChangeTab = useCallback((tab) => () => {
    if (tab !== activeTab) {
      onChange(tab);
    }
  }, [onChange, activeTab]);

  return (
    <>
      <ul className={classes.tabs}>
        {tabs.map((tab, i) => (
          <li
            key={tab.title}
            className={cx(classes.tab, {
              [classes.active]: activeTab === i,
            })}
            onClick={handeChangeTab(i)}
          >
            <Typography component="span" variant="h6" color="inherit">{tab.title}</Typography>
          </li>
        ))}
      </ul>
    </>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.number.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};
