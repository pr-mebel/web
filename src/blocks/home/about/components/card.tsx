import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';

type Props = {
    img: React.ReactNode;
    title: string;
    text: string;
};

export const Card: FC<Props> = ({ img, title, text }) => {
    const theme = useTheme();
    const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

    if (isSmDown) {
        return (
            <Grid container alignItems="center">
                <Grid item xs={2}>
                    {img}
                </Grid>
                <Grid item xs={10}>
                    <Typography
                        variant="h5"
                        sx={{
                            textTransform: 'none',
                            fontWeight: '400',
                        }}
                    >
                        {title}
                    </Typography>
                </Grid>
            </Grid>
        );
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    height: '57px',
                }}
            >
                {img}
                <Box
                    sx={{
                        marginLeft: '20px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h6">{title}</Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    marginTop: '10px',
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: '15px',
                        lineHeight: '17px',
                    }}
                >
                    {text}
                </Typography>
            </Box>
        </>
    );
};
