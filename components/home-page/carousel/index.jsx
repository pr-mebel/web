import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import cx from 'classnames';
import { Container } from '@material-ui/core';
import { PAGES } from './constants';
import { Page, Pagination } from './components';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
  },
  slider: {
    position: 'relative',
    display: 'flex',
    width: `${PAGES.length}00%`,
    height: '100%',
    transition: 'all .4s ease-in-out',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: '100px',
    width: '100%',
    '@media (max-width: 1250px)': {
      bottom: '50px',
    },
  },
  paginationInnerContainer: {
    maxWidth: '1140px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: '0',
  },
  nav: {
    color: 'white',
  },
  navDesktop: {
    width: '40px',
    height: '40px',
    color: 'white',
    position: 'absolute',
    cursor: 'pointer',
    zIndex: '50',
  },
  prevDesktop: {
    top: '50%',
    left: '30px',
  },
  nextDesktop: {
    top: '50%',
    right: '30px',
  },
  navMobile: {
    display: 'none',
  },
  prevMobile: {
    marginRight: theme.spacing(3),
  },
  nextMobile: {
    marginLeft: theme.spacing(3),
  },
  '@media (max-width: 1250px)': {
    paginationInnerContainer: {
      justifyContent: 'center',
    },
    navDesktop: {
      display: 'none',
    },
    navMobile: {
      display: 'block',
    },
  },
}));

export const Carousel = () => {
  const classes = useStyles();
  const rootRef = useRef(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const handleClickPrev = useCallback(() => {
    setActiveSlide((prev) => {
      if (prev > 0) {
        return prev - 1;
      }

      return PAGES.length - 1;
    });
  }, []);

  const handleClickNext = useCallback(() => {
    setActiveSlide((prev) => {
      if (prev < PAGES.length - 1) {
        return prev + 1;
      }

      return 0;
    });
  }, []);

  const handleChangeSlide = useCallback((value) => {
    setActiveSlide(value);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(rootRef.current ? rootRef.current.offsetWidth : 0);
    };

    const handleRotate = () => {
      handleClickNext();
    };

    if (rootRef.current) {
      handleResize();
    }

    const interval = setInterval(() => handleRotate(), 7000);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, [handleClickNext, rootRef]);

  return (
    <div className={classes.root} ref={rootRef}>
      <ArrowBackIosIcon
        className={cx(
          classes.prevDesktop,
          classes.navDesktop,
          classes.nav,
        )}
        onClick={handleClickPrev}
      />
      <div
        className={classes.slider}
        style={{ transform: `translateX(-${windowWidth * activeSlide}px)` }}
      >
        {PAGES.map((page, i) => (
          <Page
            key={page.titles[0]}
            id={i}
            titles={page.titles}
            subtitles={page.subtitles}
            texts={page.texts}
            imageSet={page.imageSet}
            to={page.to}
          />
        ))}
      </div>
      <ArrowForwardIosIcon
        className={cx(
          classes.nextDesktop,
          classes.navDesktop,
          classes.nav,
        )}
        onClick={handleClickNext}
      />
      <div className={classes.paginationContainer}>
        <Container className={classes.paginationInnerContainer}>
          <ArrowBackIosIcon
            className={cx(
              classes.prevMobile,
              classes.navMobile,
              classes.nav,
            )}
            onClick={handleClickPrev}
          />
          <Pagination
            currentPage={activeSlide}
            pages={PAGES}
            onChangeSlide={handleChangeSlide}
          />
          <ArrowForwardIosIcon
            className={cx(
              classes.nextMobile,
              classes.navMobile,
              classes.nav,
            )}
            onClick={handleClickNext}
          />
        </Container>
      </div>
    </div>
  );
};
