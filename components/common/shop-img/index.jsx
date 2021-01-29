import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    paddingTop: '30%',
    backgroundImage: 'url("images/common/shop-img/1.png")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
});

export const ShopImg = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} />
  );
};
