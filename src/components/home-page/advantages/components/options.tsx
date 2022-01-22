import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import React, { FC, useMemo } from 'react';

import { addIdsToArrayOfObjects } from '@/utils';

const useStyles = makeStyles({
    tabContent: {
        display: 'none',
    },
    tabContentVisible: {
        display: 'block',
    },
});

type Props = {
    activeTab: number;
    children: React.ReactNode[];
};

export const Options: FC<Props> = ({ activeTab, children }) => {
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
