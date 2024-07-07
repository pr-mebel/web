import { Box, Typography } from '@mui/material';

import { BlockTitle } from '@/components';

import { LIST } from '../texts';

export const Mobile = () => {
  return (
    <Box
      sx={(theme) => ({
        marginTop: '32px',
        display: 'grid',
        rowGap: '18px',
        gridTemplateColumns: '1fr',
        '& .number': {
          position: 'absolute',
          color: theme.palette.primary.main,
          opacity: '.07',
          top: '-5px',
          left: '20px',
          fontWeight: 700,
          fontSize: '70px',
          lineHeight: '70px',
        },
        '& .text': {
          marginTop: '20px',
        },
      })}
    >
      {LIST.map((item) => (
        <div key={item.id}>
          <BlockTitle>
            <Typography variant="h6">{item.title}</Typography>
          </BlockTitle>
          <Typography variant="body2" className="text">
            {item.text}
          </Typography>
        </div>
      ))}
    </Box>
  );
};
