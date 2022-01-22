import { Container, Grid, Hidden, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import bgImg from 'public/images/home-page/questions-form/1.jpg';
import React, { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { sendEmail } from '@/api';
import { BlockTitle, Input, SubmitButton } from '@/components';
import { useAnalytics, useFormSubmitModal } from '@/hooks';
import { formatPhoneInput } from '@/utils';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '80px 0',
        position: 'relative',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            padding: '60px 0',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '40px 0',
        },
    },
    title: {
        color: 'white',
    },
    subtitle: {
        color: 'white',
        marginTop: '40px',
        marginBottom: '60px',
    },
    inputLabel: {
        color: 'white',
    },
    container: {
        position: 'relative',
        zIndex: 10,
    },
    text: {
        color: 'white',
        fontSize: '14px',
        fontWeight: 100,
        lineHeight: '100%',
    },
    copyrightLink: {
        color: 'white',
    },
    buttonContainer: {
        marginTop: '36px',
        marginBottom: '24px',
    },
}));

export const QuestionsForm: FC = () => {
    const analytics = useAnalytics();
    const classes = useStyles();
    const formSubmitModal = useFormSubmitModal();
    const { register, handleSubmit, reset } = useForm();

    /**
     * Отправляет форму
     */
    const onSubmit = useCallback(
        (data) => {
            sendEmail({
                ...data,
                files: [],
                meta: {
                    place: 'Главная/Остались вопросы?',
                },
            });
            analytics.onSendEmail('vopros');
            formSubmitModal.onOpen();
            reset();
        },
        [reset, formSubmitModal, analytics]
    );

    return (
        <div className={classes.root}>
            <Image
                src={bgImg}
                alt="Заполните форму ниже. Наш менеджер свяжется с вами и ответит на вопросы"
                layout="fill"
                objectFit="cover"
                placeholder="blur"
            />
            <Container className={classes.container}>
                <BlockTitle>
                    <Typography variant="h4" className={classes.title}>
                        Остались вопросы?
                    </Typography>
                </BlockTitle>
                <Typography variant="h6" className={classes.subtitle}>
                    Заполните форму ниже. Наш менеджер свяжется с вами и ответит на вопросы
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container>
                        <Grid item xs={1} md={3} />
                        <Grid item xs={10} md={6} container spacing={2}>
                            <Grid item xs={12} sm={5}>
                                <Input
                                    ref={register}
                                    name="name"
                                    placeholder="Имя"
                                    type="name"
                                    fullWidth
                                    autoComplete="name"
                                    required
                                    darkMode
                                />
                            </Grid>
                            <Hidden xsDown>
                                <Grid item sm={2} />
                            </Hidden>
                            <Grid item xs={12} sm={5}>
                                <Input
                                    ref={register}
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
                            <Grid item xs={12}>
                                <Input
                                    ref={register}
                                    name="description"
                                    placeholder="Описание"
                                    type="text"
                                    fullWidth
                                    required
                                    darkMode
                                    rows={5}
                                    multiline
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container justifyContent="center" className={classes.buttonContainer}>
                            <Grid item xs={10} sm={6} md={4}>
                                <SubmitButton>Задать вопрос</SubmitButton>
                            </Grid>
                        </Grid>
                        <Grid item xs container justifyContent="center">
                            <Grid item xs={10} md={6}>
                                <Typography className={classes.text} align="center">
                                    Нажимая кнопку &laquo;Задать вопрос&raquo;, я&nbsp;даю согласие на&nbsp;обработку
                                    персональных данных и&nbsp;подтверждаю, что ознакомлен с&nbsp;
                                    <a
                                        href="https://docs.google.com/document/d/1KSM18JIPpeT6weSQaG3dgpTEC9MO3wvxYWsrF2A6CZE/edit"
                                        className={classes.copyrightLink}
                                    >
                                        пользовательским соглашением
                                    </a>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    );
};
