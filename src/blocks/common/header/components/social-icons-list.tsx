import { FC } from 'react';

import { Link } from '@/components';
import { Facebook, Instagram, Vkontakte } from '@/components/icons';

import { List } from './list';

export const SocialIconsList: FC = () => (
    <List
        sx={(theme) => ({
            display: 'flex',
            flexDirection: 'row',
            width: '100px',
            justifyContent: 'space-between',
            margin: 'auto',
            '& .socialIcon': {
                '&:hover path': {
                    fill: theme.palette.primary.main,
                    transition: 'fill .1s',
                },
            },
        })}
    >
        <li>
            <Link href="https://vk.com/public185518769">
                <Vkontakte className="socialIcon" />
            </Link>
        </li>
        <li>
            <Link href="https://www.instagram.com/pr_mebel.ru/">
                <Instagram className="socialIcon" />
            </Link>
        </li>
        <li>
            <Link href="https://www.facebook.com/%D0%A7%D0%B0%D1%81%D1%82%D0%BD%D1%8B%D0%B9-%D0%BC%D0%B5%D0%B1%D0%B5%D0%BB%D1%8C%D0%B5%D1%80-108136607213942">
                <Facebook className="socialIcon" />
            </Link>
        </li>
    </List>
);
