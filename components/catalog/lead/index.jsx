import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import Image from 'next/image';
import { images } from './constants';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '70px',
    width: '100%',
    paddingTop: '35%',
    maxHeight: '500px',
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
    [theme.breakpoints.down('md')]: {
      marginTop: '50px',
    },
  },
  image: {
    opacity: '0',
    transition: 'opacity .3s ease-in-out',
  },
  selectedImage: {
    opacity: '1',
  },
}));

export const Lead = ({ sectionId }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {images.map((imageWrapper) => (
        <Image
          key={imageWrapper.id}
          src={imageWrapper.image}
          alt={imageWrapper.sectionId}
          className={cn(classes.image, {
            [classes.selectedImage]: imageWrapper.sectionId === sectionId,
          })}
          layout="fill"
          objectFit="cover"
        />
      ))}
    </div>
  );
};

Lead.propTypes = {
  sectionId: PropTypes.string.isRequired,
};
