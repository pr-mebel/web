import { Box } from '@mui/material';
import React, { FC, useMemo } from 'react';

import { addIdsToArrayOfObjects } from '@/utils';

type Props = {
    activeTab: number;
    children: React.ReactNode[];
};

export const Options: FC<Props> = ({ activeTab, children }) => {
    const childrenWithIds = useMemo(() => addIdsToArrayOfObjects(children), [children]);

    return (
        <>
            {childrenWithIds.map((child, i) => (
                <Box
                    key={child.id}
                    sx={{
                        display: activeTab === i ? 'block' : 'none',
                    }}
                >
                    {child.data}
                </Box>
            ))}
        </>
    );
};
