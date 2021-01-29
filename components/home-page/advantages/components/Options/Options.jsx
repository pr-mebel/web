import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { v4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  tabContent: {
    display: 'none',
  },
  tabContentVisible: {
    display: 'block',
  },
});

export const Options = ({
  activeTab,
  children,
}) => {
  const classes = useStyles();

  return (
    <>
      {children.map((child, i) => (
        <div
          key={v4()}
          className={cx(classes.tabContent, {
            [classes.tabContentVisible]: activeTab === i,
          })}
        >
          {child}
        </div>
      ))}
    </>
  );
};

Options.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  activeTab: PropTypes.number.isRequired,
};
