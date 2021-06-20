import React, { useCallback, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid, TextField, Hidden } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { saveForm, submitForm, uploadFiles, openFormSubmitPopup } from '@/redux';
import { getFileDeclination } from '@/utils';
import PublishIcon from '@material-ui/icons/Publish';
import ClearIcon from '@material-ui/icons/Clear';
import { BlockTitle, SubmitButton } from '@/components/common';

const useStyles = makeStyles({
    root: {
        backgroundImage: 'url("images/catalog/questions/1.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 0',
    },
    title: {
        color: 'white',
    },
    subtitle: {
        margin: '40px 0',
        color: 'white',
    },
    inputContainer: {
        marginBottom: '15px',
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
    inputFile: {
        display: 'none',
    },
    files: {
        marginTop: '30px',
        marginBottom: '20px',
    },
    fileInputContainer: {
        cursor: 'pointer',
    },
    icon: {
        marginRight: '5px',
        color: 'white',
    },
    deleteFilesIcon: {
        cursor: 'pointer',
        color: 'white',
        width: '20px',
        height: '20px',
        position: 'absolute',
        right: '-30px',
        bottom: '1px',
    },
    fileInputText: {
        color: 'white',
        position: 'relative',
    },
});

export const Questions = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileNames, setFileNames] = useState<FileList>(([] as unknown) as FileList);
    const { register, handleSubmit, reset } = useForm();

    /**
     * Обработчик клика на инпут загрузки файла
     */
    const handleFileInputClick = useCallback(() => {
        fileInputRef.current?.click();
    }, [fileInputRef]);

    /**
     * Загружает выбранные файлы на сервер
     */
    const handleFileUploadChange = useCallback(() => {
        if (fileInputRef.current?.files) {
            setFileNames(fileInputRef.current.files);
        }
    }, [fileInputRef]);

    /**
     * Удаляет выбранные файлы
     */
    const handleDeleteSelectedFiles = useCallback(() => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            setFileNames(([] as unknown) as FileList);
        }
    }, []);

    /**
     * Отправляет форму после клика на кнопку
     */
    const onSubmit = useCallback(
        (data) => {
            dispatch(saveForm(data));
            dispatch(submitForm());
            if (fileNames.length && fileInputRef.current) {
                dispatch(uploadFiles(fileNames));
                dispatch(openFormSubmitPopup());
                fileInputRef.current.value = '';
                setFileNames(([] as unknown) as FileList);
            } else {
                dispatch(submitForm());
            }
            reset();
        },
        [fileNames, reset, dispatch],
    );

    return (
        <div className={classes.root}>
            <Container className={classes.container}>
                <BlockTitle>
                    <Typography variant="h4" className={classes.title} gutterBottom>
                        Остались вопросы?
                        <Hidden smUp>
                            <br />
                        </Hidden>
                        Задайте их тут!
                    </Typography>
                </BlockTitle>
                <Hidden smDown>
                    <Typography className={classes.subtitle} gutterBottom>
                        А&nbsp;если вы&nbsp;хотите получить расчет конкретной модели, прикрепите
                        свои эскизы или план помещения с&nbsp;описанием пожеланий и&nbsp;наш
                        дизайнер в&nbsp;кротчайшие сроки подготовит для вас предложение!
                    </Typography>
                </Hidden>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container>
                        <Grid item xs={1} sm={3} />
                        <Grid item xs={10} sm={6} container>
                            <Grid item xs={12} className={classes.inputContainer}>
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
                            <Grid item xs={12} className={classes.inputContainer}>
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
                            <Grid item xs={12} className={classes.inputContainer}>
                                <TextField
                                    inputRef={register}
                                    name="email"
                                    type="email"
                                    autoComplete="email"
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
                                    placeholder="E-mail"
                                    label="E-mail"
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
                            <Grid container justify="center" className={classes.files}>
                                <input
                                    type="file"
                                    multiple
                                    ref={fileInputRef}
                                    className={classes.inputFile}
                                    onChange={handleFileUploadChange}
                                />
                                <Grid
                                    item
                                    xs={12}
                                    sm={7}
                                    container
                                    justify="center"
                                    onClick={handleFileInputClick}
                                    className={classes.fileInputContainer}
                                >
                                    <PublishIcon className={classes.icon} />
                                    <Typography className={classes.fileInputText}>
                                        Прикрепить эскизы
                                    </Typography>
                                </Grid>
                                {!!fileNames.length && (
                                    <Grid item xs={12} sm={5} container justify="center">
                                        <Typography className={classes.fileInputText}>
                                            {`${fileNames.length}\xA0${getFileDeclination(
                                                fileNames.length,
                                            )}`}
                                            <ClearIcon
                                                className={classes.deleteFilesIcon}
                                                onClick={handleDeleteSelectedFiles}
                                            />
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            container
                            justify="center"
                            className={classes.buttonContainer}
                        >
                            <Grid item xs={8} sm={6} md={4}>
                                <SubmitButton>Отправить</SubmitButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={1} sm={2} md={3} />
                        <Grid item xs={10} sm={8} md={6}>
                            <Typography className={classes.text} align="center">
                                Нажимая кнопку &laquo;Рассчитать стоимость&raquo;, я&nbsp;даю
                                согласие на&nbsp;обработку персональных данных и&nbsp;подтверждаю,
                                что ознакомлен с&nbsp;
                                <a
                                    href="https://docs.google.com/document/d/1KSM18JIPpeT6weSQaG3dgpTEC9MO3wvxYWsrF2A6CZE/edit"
                                    className={classes.copyrightLink}
                                >
                                    пользовательским соглашением
                                </a>
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    );
};
