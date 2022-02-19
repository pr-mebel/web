import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';

type Props = {
    img: React.ReactNode;
};

export const DesignCard: FC<Props> = ({ img, children }) => {
    const theme = useTheme();
    const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid container alignItems="center" spacing={1} direction={isSmDown ? 'row' : 'column'}>
            <Grid item xs={2} sm={12}>
                {img}
            </Grid>
            <Grid item xs={10} sm={12}>
                <Typography
                    sx={(theme) => ({
                        [theme.breakpoints.down('sm')]: {
                            fontSize: '14px',
                            lineHeight: '16px',
                        },
                    })}
                    variant="body2"
                    align={isSmDown ? 'left' : 'center'}
                >
                    {children}
                </Typography>
            </Grid>
        </Grid>
    );
};
