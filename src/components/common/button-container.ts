import { styled } from '@mui/material';

export const ButtonContainer = styled('div')({
  width: '350px',
  margin: 'auto',
  '@media (max-width: 991px)': {
    width: '330px',
  },
  '@media (max-width: 767px)': {
    width: '300px',
  },
  '@media (max-width: 480px)': {
    width: '250px',
  },
});
