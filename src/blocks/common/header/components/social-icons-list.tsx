import { Box } from '@mui/material';
import { FC } from 'react';

import { Link } from '@/components';
import { Vkontakte } from '@/components/icons';

import { List } from './list';

export const SocialIconsList: FC = () => (
    <List
        sx={(theme) => ({
            display: 'flex',
            flexDirection: 'row',
            width: '100px',
            justifyContent: 'center',
            margin: 'auto',
            '& .socialIcon': {
                '&:hover path': {
                    fill: theme.palette.primary.main,
                    transition: 'fill .1s',
                },
            },
        })}
    >
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <Link
                sx={{
                    display: 'inline-flex',
                }}
                href="https://vk.com/public185518769"
            >
                <Vkontakte className="socialIcon" />
            </Link>
        </Box>
    </List>
);
