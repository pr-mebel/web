import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { images } from './constants';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '500px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    '&:after': {
      position: 'absolute',
      content: '""',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      background: 'rgba(0, 0, 0, .3)',
    },
  },
});

export const Lead = ({ sectionId }) => {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ backgroundImage: `url("${images[sectionId]}")` }} />
  );
};

Lead.propTypes = {
  sectionId: PropTypes.string.isRequired,
};
