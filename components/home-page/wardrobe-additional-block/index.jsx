import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { BlockTitle } from 'components/common';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  text: {
    marginTop: '20px',
  },
});

export const WardrobeAdditionalBlock = ({
  title,
  text,
}) => {
  const classes = useStyles();

  return (
    <>
      <BlockTitle>
        <Typography variant="h5">
          {title}
        </Typography>
      </BlockTitle>
      <Typography variant="body2" className={classes.text}>
        {text}
      </Typography>
    </>
  );
};

WardrobeAdditionalBlock.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
