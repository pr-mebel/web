import React, { FC, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { submitForm, saveForm } from '@/redux';
import { BlockTitle, SubmitButton } from '@/components/common';

const useStyles = makeStyles({
    root: {
        padding: '80px 0',
        position: 'relative',
        width: '100%',
    },
    title: {
        color: 'white',
    },
    subtitle: {
        color: 'white',
        marginTop: '40px',
        marginBottom: '60px',
    },
    inputInner: {
        color: 'white',
        '&:placeholder': {
            color: 'white',
        },
    },
    inputRoot: {
        '&:hover&:before,&:before': {
            borderColor: 'white',
        },
    },
    inputLabel: {
        color: 'white',
    },
    textarea: {
        marginTop: '20px',
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
});

export const QuestionsForm: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();

    /**
     * Отправляет форму
     */
    const onSubmit = useCallback(
        (data) => {
            dispatch(saveForm(data));
            dispatch(submitForm());
            reset();
        },
        [reset, dispatch],
    );

    return (
        <div className={classes.root}>
            <Image
                src="/images/home-page/questions-form/1.jpg"
                alt="Заполните форму ниже. Наш менеджер свяжется с вами и ответит на вопросы"
                layout="fill"
                quality={100}
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
                        <Grid item xs={10} md={6} container>
                            <Grid item xs={5}>
                                <TextField
                                    inputRef={register}
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    InputProps={{
                                        classes: {
                                            root: classes.inputRoot,
                                            input: classes.inputInner,
                                        },
                                    }}
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.inputLabel,
                                        },
                                    }}
                                    fullWidth
                                    placeholder="Имя"
                                    label="Имя"
                                    required
                                />
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={5}>
                                <TextField
                                    inputRef={register}
                                    name="tel"
                                    type="tel"
                                    autoComplete="tel"
                                    InputProps={{
                                        classes: {
                                            root: classes.inputRoot,
                                            input: classes.inputInner,
                                        },
                                    }}
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.inputLabel,
                                        },
                                    }}
                                    fullWidth
                                    placeholder="Телефон"
                                    label="Телефон"
                                    required
                                />
                            </Grid>
                            <TextField
                                inputRef={register}
                                name="description"
                                fullWidth
                                multiline
                                className={classes.textarea}
                                InputProps={{
                                    classes: {
                                        root: classes.inputRoot,
                                        input: classes.inputInner,
                                    },
                                }}
                                InputLabelProps={{
                                    classes: {
                                        root: classes.inputLabel,
                                    },
                                }}
                                variant="filled"
                                placeholder="Описание"
                                label="Описание"
                                rows={5}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            container
                            justify="center"
                            className={classes.buttonContainer}
                        >
                            <Grid item xs={10} sm={6} md={4}>
                                <SubmitButton>Задать вопрос</SubmitButton>
                            </Grid>
                        </Grid>
                        <Grid item xs container justify="center">
                            <Grid item xs={10} md={6}>
                                <Typography className={classes.text} align="center">
                                    Нажимая кнопку &laquo;Задать вопрос&raquo;, я&nbsp;даю согласие
                                    на&nbsp;обработку персональных данных и&nbsp;подтверждаю, что
                                    ознакомлен с&nbsp;
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
