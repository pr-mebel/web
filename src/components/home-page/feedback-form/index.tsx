import React, { FC, useRef, useCallback, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container, Grid, Typography, TextField, Hidden } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { saveForm, submitForm, openFormSubmitPopup, uploadFiles } from '@/redux';
import PublishIcon from '@material-ui/icons/Publish';
import ClearIcon from '@material-ui/icons/Clear';
import { getFileDeclination } from '@/utils';
import { SubmitButton } from '@/components/common';

const useStyles = makeStyles((theme) => ({
    root: {
        background: theme.palette.grey[900],
        padding: '63px 0',
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
        lineHeight: '14px',
    },
    publish: {
        display: 'flex',
        flexDirection: 'row',
        cursor: 'pointer',
    },
    icon: {
        color: theme.palette.primary.main,
        width: '30px',
        height: '30px',
    },
    textPublish: {
        color: 'white',
        textTransform: 'uppercase',
        fontSize: '12px',
        lineHeight: '14px',
        marginLeft: '4px',
    },
    copyText: {
        color: 'white',
        fontSize: '12px',
        fontWeight: 100,
        lineHeight: '12px',
    },
    copyrightLink: {
        color: 'white',
    },
    inputFile: {
        display: 'none',
    },
    buttonContainer: {
        marginTop: '36px',
        marginBottom: '24px',
    },
    fileUploadContainer: {
        position: 'relative',
        [theme.breakpoints.up('sm')]: {
            paddingTop: '16px',
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: '20px',
        },
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
        fontSize: '16px',
    },
}));

export const FeedbackForm: FC = () => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const fileInputRef = useRef<HTMLInputElement>(null);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { register, handleSubmit, reset } = useForm();
    const [fileNames, setFileNames] = useState<FileList>(([] as unknown) as FileList);

    /**
     * Имитирует клик на инпут файла
     */
    const handleFileInputClick = useCallback(() => {
        fileInputRef.current?.click();
    }, [fileInputRef]);

    /**
     * Сохраняет выбранные файлы в массив
     */
    const handleFileUploadChange = useCallback(() => {
        if (fileInputRef.current?.files) {
            setFileNames(fileInputRef.current.files);
        }
    }, [fileInputRef]);

    /**
     * Очищает массив сохраненных файлов
     */
    const handleClearFiles = useCallback(() => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            setFileNames(([] as unknown) as FileList);
        }
    }, [fileInputRef]);

    /**
     * Отправляет форму
     */
    const onSubmit = useCallback(
        (data) => {
            dispatch(saveForm(data));
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
        [reset, fileNames, fileInputRef, dispatch],
    );

    return (
        <div className={classes.root}>
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container justify="center">
                        <Grid item xs={1} />
                        <Grid
                            item
                            xs={10}
                            md={6}
                            container
                            direction="row"
                            spacing={smDown ? 2 : 4}
                        >
                            <Grid item xs={12} md={6}>
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
                            <Grid item xs={12} md={6}>
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
                            <Hidden smDown>
                                <Grid item xs={12}>
                                    <Typography variant="body2" className={classes.text}>
                                        Прикрепите, пожалуйста, эскизы вашей мебели или просто план
                                        помещения с&nbsp;описанием ваших пожеланий и&nbsp;наш
                                        дизайнер в&nbsp;кратчайшие сроки подготовит для вас свои
                                        предложения.
                                    </Typography>
                                </Grid>
                            </Hidden>
                        </Grid>
                        <Grid item xs={1} />
                        <Grid
                            item
                            xs={10}
                            md={4}
                            container
                            justify="center"
                            alignItems={smDown ? 'center' : 'flex-start'}
                            className={classes.fileUploadContainer}
                        >
                            <Grid item xs={6} container justify="center">
                                <input
                                    type="file"
                                    multiple
                                    ref={fileInputRef}
                                    className={classes.inputFile}
                                    onChange={handleFileUploadChange}
                                />
                                <div onClick={handleFileInputClick} className={classes.publish}>
                                    <PublishIcon className={classes.icon} />
                                    <Typography className={classes.textPublish}>
                                        Прикрепить
                                        <br />
                                        эскизы
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                {!!fileNames.length && (
                                    <Grid item xs={12} container justify="center">
                                        <Typography className={classes.fileInputText}>
                                            {`${fileNames.length}\xA0${getFileDeclination(
                                                fileNames.length,
                                            )}`}
                                            <ClearIcon
                                                className={classes.deleteFilesIcon}
                                                onClick={handleClearFiles}
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
                            <Grid item xs={10} sm={6} md={4}>
                                <SubmitButton>Рассчитать стоимость</SubmitButton>
                            </Grid>
                        </Grid>
                        <Grid item xs container justify="center">
                            <Grid item xs={12} sm={8} md={6}>
                                <Typography className={classes.copyText} align="center">
                                    Нажимая кнопку &laquo;Рассчитать стоимость&raquo;, я&nbsp;даю
                                    согласие на&nbsp;обработку персональных данных
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
