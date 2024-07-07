import { Box } from '@mui/material';

import { useYaCounter54949111 } from '@/analytics';
import { Link } from '@/components';
import { Vkontakte } from '@/components/icons';

import { List } from './list';

export const SocialIconsList = () => {
  const analytics = useYaCounter54949111();

  return (
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
        onClick={() => analytics.track('social-networks/vk/visit')}
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
};
