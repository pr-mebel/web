import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import React, { FC, useCallback } from 'react';

const useStyles = makeStyles((theme) => ({
    tabs: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    tab: {
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
    active: {
        cursor: 'default',
        color: theme.palette.primary.main,
    },
}));

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
    const classes = useStyles();

    /**
     * Обработчик клика на вкладку
     */
    const handeChangeTab = useCallback(
        (tab) => () => {
            if (tab !== activeTab) {
                onChange(tab);
            }
        },
        [onChange, activeTab]
    );

    return (
        <>
            <ul className={classes.tabs}>
                {tabs.map((tab, i) => (
                    <li
                        key={tab.id}
                        className={cn(classes.tab, {
                            [classes.active]: activeTab === i,
                        })}
                        onClick={handeChangeTab(i)}
                    >
                        <Typography component="span" variant="h6" color="inherit">
                            {tab.data.title}
                        </Typography>
                    </li>
                ))}
            </ul>
        </>
    );
};
