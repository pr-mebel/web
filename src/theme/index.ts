import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1370,
            xl: 1920,
        },
    },
    spacing: 6,
    palette: {
        primary: {
            main: '#ff001f',
        },
    },
    overrides: {
        MuiTypography: {
            h1: {
                fontFamily: 'Gilroy, sans-serif',
            },
            h2: {
                fontFamily: 'Gilroy, sans-serif',
            },
            h3: {
                fontFamily: 'Gilroy, sans-serif',
            },
            h4: {
                textTransform: 'uppercase',
                fontSize: '30px',
                lineHeight: '35px',
                fontWeight: 300,
                fontFamily: 'Gilroy, sans-serif',
                '@media (max-width: 960px)': {
                    fontSize: '26px',
                },
                '@media (max-width: 600px)': {
                    fontSize: '22px',
                    lineHeight: '25px',
                },
            },
            h5: {
                textTransform: 'uppercase',
                fontSize: '24px',
                lineHeight: '28px',
                fontWeight: 300,
                fontFamily: 'Gilroy, sans-serif',
                '@media (max-width: 600px)': {
                    fontSize: '16px',
                    lineHeight: '20px',
                },
            },
            h6: {
                textTransform: 'uppercase',
                fontSize: '18px',
                lineHeight: '1.3',
                fontWeight: 300,
                fontFamily: 'Gilroy, sans-serif',
                '@media (max-width: 960px)': {
                    fontSize: '16px',
                },
                '@media (max-width: 600px)': {
                    fontSize: '14px',
                    lineHeight: '16px',
                },
            },
            subtitle1: {
                fontFamily: 'Gilroy, sans-serif',
            },
            subtitle2: {
                fontFamily: 'Gilroy, sans-serif',
            },
            body1: {
                fontSize: '18px',
                lineHeight: '1.4',
                letterSpacing: 'normal',
                fontFamily: 'Gilroy, sans-serif',
            },
            body2: {
                fontSize: '16px',
                lineHeight: '18px',
                letterSpacing: 'normal',
                fontFamily: 'Gilroy, sans-serif',
                '@media (max-width: 960px)': {
                    fontSize: '15px',
                },
            },
        },
        MuiContainer: {
            root: {
                '@media (min-width: 600px)': {
                    paddingLeft: '5%',
                    paddingRight: '5%',
                },
            },
        },
    },
});
