import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import bgImg from 'public/images/home-page/questions-form/1.jpg';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

import { useSendEmail } from '@/api';
import { BlockTitle, Button, Input } from '@/components';
import { useAnalytics } from '@/hooks';
import { formatPhoneInput } from '@/utils';

export const QuestionsForm: FC = () => {
    const analytics = useAnalytics();
    const { register, handleSubmit, reset } = useForm();
    const { loading, onSendEmail } = useSendEmail({
        place: 'Главная/Остались вопросы?',
        onFinish: () => {
            analytics.onSendEmail('vopros');
            reset();
        },
    });

    return (
        <Box
            sx={(theme) => ({
                padding: '80px 0',
                position: 'relative',
                width: '100%',
                [theme.breakpoints.down('md')]: {
                    padding: '60px 0',
                },
                [theme.breakpoints.down('sm')]: {
                    padding: '40px 0',
                },
                '&::after': {
                    position: 'absolute',
                    content: '""',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, .8)',
                },
            })}
        >
            <Image
                src={bgImg}
                alt="Заполните форму ниже. Наш менеджер свяжется с вами и ответит на вопросы"
                layout="fill"
                objectFit="cover"
                placeholder="blur"
            />
            <Container
                sx={{
                    position: 'relative',
                    zIndex: 10,
                }}
            >
                <BlockTitle>
                    <Typography
                        variant="h3"
                        sx={{
                            color: 'white',
                            fontSize: '30px',
                            lineHeight: '35px',
                            fontWeight: 300,
                            textTransform: 'uppercase',
                            '@media (max-width: 480px)': {
                                fontSize: '20px',
                                lineHeight: '23px',
                            },
                            '@media (max-width: 767px)': {
                                fontSize: '22px',
                                lineHeight: '25px',
                            },
                            '@media (max-width: 1199px)': {
                                fontSize: '26px',
                                lineHeight: '30px',
                            },
                        }}
                    >
                        Остались вопросы?
                    </Typography>
                </BlockTitle>
                <Typography
                    variant="h6"
                    sx={{
                        color: 'white',
                        marginTop: '40px',
                        marginBottom: '60px',
                    }}
                >
                    Заполните форму ниже. Наш менеджер свяжется с вами и ответит на вопросы
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSendEmail)}
                    sx={{
                        maxWidth: '380px',
                        margin: '20px auto 0',
                        background: 'rgba(89, 89, 89, 0.46)',
                        borderRadius: '5px',
                        padding: '40px',
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        rowGap: '15px',
                    }}
                >
                    <Input
                        inputRef={register}
                        name="name"
                        placeholder="Имя"
                        type="text"
                        fullWidth
                        autoComplete="name"
                        required
                        darkMode
                    />
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
                    <Input
                        inputRef={register}
                        name="description"
                        type="text"
                        fullWidth
                        multiline
                        rows={5}
                        placeholder="Ваш вопрос"
                        sx={{
                            marginTop: '20px',
                        }}
                        darkMode
                    />
                    <Box
                        sx={{
                            marginTop: '12px',
                        }}
                    >
                        <Button type="submit" block loading={loading}>
                            Отправить
                        </Button>
                    </Box>
                </Box>
                <Typography
                    sx={{
                        margin: '20px auto 0',
                        maxWidth: '545px',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 300,
                        lineHeight: '100%',
                    }}
                    align="center"
                >
                    Нажимая кнопку &laquo;Рассчитать стоимость&raquo;, я&nbsp;даю согласие на&nbsp;обработку
                    персональных данных и&nbsp;подтверждаю, что ознакомлен с&nbsp;
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
            </Container>
        </Box>
    );
};
