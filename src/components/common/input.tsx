import { Input as MUIInput, InputProps as MUIInputProps, styled } from '@mui/material';

type InputProps = MUIInputProps & {
    darkMode?: boolean;
};

export const Input = styled(MUIInput, {
    shouldForwardProp: (prop) => prop !== 'darkMode',
})<InputProps>(({ darkMode }) => ({
    paddingLeft: '30px',
    paddingRight: '30px',
    ...(darkMode
        ? {
              '& .MuiInput-input': {
                  color: 'white',
              },
              '&:hover&:before,&:before': {
                  borderBottomColor: 'white',
              },
          }
        : {}),
}));
