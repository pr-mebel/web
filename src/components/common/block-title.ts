import { Box, styled } from '@mui/material';

export const BlockTitle = styled(Box)(({ theme }) => ({
    position: 'relative',
    marginBottom: '11px',
    '&:after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        left: '0',
        bottom: '-2px',
        width: '65px',
        height: '1px',
        background: theme.palette.primary.main,
    },
}));
