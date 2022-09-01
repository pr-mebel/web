import { Box, Container, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

import { useSendEmail } from '@/api';
import { Button, ButtonContainer, Input } from '@/components';
import { useAnalytics } from '@/hooks';
import { formatPhoneInput } from '@/utils';

export const CallDesignerForm: FC = () => {
    const analytics = useAnalytics();
    const { register, handleSubmit, reset } = useForm();
    const { loading, onSendEmail } = useSendEmail({
        place: 'home/call-designer',
        onFinish: () => {
            analytics.onSendEmail('designer');
            reset();
        },
    });

    return (
        <Box
            sx={(theme) => ({
                background: '#303030',
                padding: '65px 0',
                [theme.breakpoints.down('sm')]: {
                    padding: '40px 0',
                },
            })}
        >
            <Container>
                <form onSubmit={handleSubmit(onSendEmail)}>
                    <Grid container>
                        <Grid item xs={1} sm={3} />
                        <Grid item xs={10} sm={6} container spacing={1}>
                            <Grid item xs={12} md={5}>
                                <Input
                                    inputRef={register}
                                    name="name"
                                    placeholder="Имя"
                                    type="name"
                                    fullWidth
                                    autoComplete="name"
                                    required
                                    darkMode
                                />
                            </Grid>
                            <Grid item md={2} />
                            <Grid item xs={12} md={5}>
                                <Input
                                    inputRef={register}
                                    name="tel"
                                    placeholder="Телефон"
                                    type="tel"
                                    fullWidth
                                    autoComplete="tel"
                                    required
                                    darkMode
                                    onChange={(event) => {
                                        event.target.value = formatPhoneInput(event.target.value);
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                marginTop: '36px',
                                marginBottom: '24px',
                            }}
                        >
                            <ButtonContainer>
                                <Button type="submit" block loading={loading}>
                                    Вызвать дизайнера
                                </Button>
                            </ButtonContainer>
                        </Grid>
                        <Grid item xs container justifyContent="center">
                            <Grid item xs={10} sm={6}>
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontSize: '14px',
                                        fontWeight: 300,
                                        lineHeight: '100%',
                                    }}
                                    align="center"
                                >
                                    Нажимая кнопку &laquo;Вызвать дизайнера&raquo;, я&nbsp;даю согласие
                                    на&nbsp;обработку персональных данных и&nbsp;подтверждаю, что ознакомлен с&nbsp;
                                    <Box
                                        component="a"
                                        href="https://docs.google.com/document/d/1KSM18JIPpeT6weSQaG3dgpTEC9MO3wvxYWsrF2A6CZE/edit"
                                        sx={{
                                            color: 'white',
                                        }}
                                    >
                                        пользовательским соглашением
                                    </Box>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </Box>
    );
};
