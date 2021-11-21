import React, { FC, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Container, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { saveForm, submitForm } from '@/redux';
import { SubmitButton } from '@/components/common';

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#303030',
        padding: '65px 0',
        [theme.breakpoints.down('xs')]: {
            padding: '40px 0',
        },
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
    text: {
        color: 'white',
        fontSize: '14px',
        fontWeight: 100,
        lineHeight: '100%',
    },
    buttonContainer: {
        marginTop: '36px',
        marginBottom: '24px',
    },
    copyrightLink: {
        color: 'white',
    },
}));

export const CallDesignerForm: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();

    /**
     * Отправляет заполненную форму
     */
    const onSubmit = useCallback(
        (data) => {
            dispatch(saveForm(data));
            dispatch(submitForm());
            reset();
        },
        [reset, dispatch]
    );

    return (
        <div className={classes.root}>
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container>
                        <Grid item xs={1} sm={3} />
                        <Grid item xs={10} sm={6} container>
                            <Grid item xs={12} md={5}>
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
                            <Grid item md={2} />
                            <Grid item xs={12} md={5}>
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
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            container
                            justifyContent="center"
                            className={classes.buttonContainer}
                        >
                            <Grid item xs={10} sm={6} md={4}>
                                <SubmitButton>Вызвать дизайнера</SubmitButton>
                            </Grid>
                        </Grid>
                        <Grid item xs container justifyContent="center">
                            <Grid item xs={10} sm={6}>
                                <Typography
                                    variant="body2"
                                    className={classes.text}
                                    align="center"
                                >
                                    Нажимая кнопку &laquo;Вызвать
                                    дизайнера&raquo;, я&nbsp;даю согласие
                                    на&nbsp;обработку персональных данных
                                    и&nbsp;подтверждаю, что ознакомлен с&nbsp;
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
