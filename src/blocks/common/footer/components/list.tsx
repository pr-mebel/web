import { Box, BoxProps, styled } from '@mui/material';

const ListBase = (props: BoxProps<'ul'>) => (
    <Box component="ul" {...props}>
        {props.children}
    </Box>
);

export const List = styled(ListBase)(({ theme }) => ({
    listStyle: 'none',
    padding: '0',
    margin: '0',
    '& .listItem': {
        fontSize: '14px',
        marginBottom: '8px',
    },
    [theme.breakpoints.down('md')]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));
