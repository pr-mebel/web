import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { addIdsToArrayOfObjects } from 'lib/utils';

const useStyles = makeStyles({
    tabContent: {
        display: 'none',
    },
    tabContentVisible: {
        display: 'block',
    },
});

export const Options = ({ activeTab, children }) => {
    const classes = useStyles();

    const childrenWithIds = useMemo(() => addIdsToArrayOfObjects(children), [children]);

    return (
        <>
            {childrenWithIds.map((child, i) => (
                <div
                    key={child.id}
                    className={cn(classes.tabContent, {
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
