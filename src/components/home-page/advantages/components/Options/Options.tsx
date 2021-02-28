import React, { FC, useMemo } from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { addIdsToArrayOfObjects } from '@/utils';
import { OptionsProps } from './types';

const useStyles = makeStyles({
    tabContent: {
        display: 'none',
    },
    tabContentVisible: {
        display: 'block',
    },
});

export const Options: FC<OptionsProps> = ({ activeTab, children }) => {
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
                    {child.data}
                </div>
            ))}
        </>
    );
};
