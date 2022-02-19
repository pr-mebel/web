import { Box, Typography } from '@mui/material';
import React, { FC, useCallback } from 'react';

type Props = {
    activeTab: number;
    tabs: {
        id: string;
        data: {
            title: string;
        };
    }[];
    onChange: (arg0: number) => void;
};

export const Tabs: FC<Props> = ({ activeTab, tabs, onChange }) => {
    const handeChangeTab = useCallback(
        (tab) => () => {
            if (tab !== activeTab) {
                onChange(tab);
            }
        },
        [onChange, activeTab]
    );

    return (
        <Box
            sx={(theme) => ({
                margin: '0',
                padding: '0',
                listStyle: 'none',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                '& .tab': {
                    marginRight: '30px',
                    lineHeight: '25px',
                    position: 'relative',
                    transition: 'all .3s',
                    cursor: 'pointer',
                    '&:after': {
                        position: 'absolute',
                        fontSize: '20px',
                        fontWeight: '300',
                        color: 'black',
                        content: '"|"',
                        right: '-20px',
                        bottom: '1px',
                    },
                    '&:last-of-type&:after': {
                        display: 'none',
                    },
                    '&:hover': {
                        color: theme.palette.primary.main,
                    },
                },
            })}
        >
            {tabs.map((tab, i) => (
                <Box
                    key={tab.id}
                    component="li"
                    sx={(theme) =>
                        activeTab === i
                            ? {
                                  cursor: 'default',
                                  color: theme.palette.primary.main,
                              }
                            : {}
                    }
                    className="tab"
                    onClick={handeChangeTab(i)}
                >
                    <Typography component="span" variant="h6" color="inherit">
                        {tab.data.title}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};
