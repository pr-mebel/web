import { Box, BoxProps, styled } from '@mui/material';

const ListBase = (props: BoxProps) => (
  <Box component="ul" {...props}>
    {props.children}
  </Box>
);
export const List = styled(ListBase)({
  listStyle: 'none',
  padding: '0',
  margin: '0',
});
