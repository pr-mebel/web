import React, { FC, useCallback, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid, Hidden } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { formatPhoneInput, getFileDeclination } from '@/utils';
import { sendEmail } from '@/api';
import PublishIcon from '@material-ui/icons/Publish';
import ClearIcon from '@material-ui/icons/Clear';
import { BlockTitle, SubmitButton, Input } from '@/components';
import { useFormSubmitModal } from '@/hooks';

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

export const Questions: FC = () => {
    const classes = useStyles();
    const formSubmitModal = useFormSubmitModal();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<FileList | null>(null);
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
            setFileList(fileInputRef.current.files);
        }
    }, [fileInputRef]);

    /**
     * Удаляет выбранные файлы
     */
    const handleDeleteSelectedFiles = useCallback(() => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            setFileList(null);
        }
    }, []);

    /**
     * Отправляет форму после клика на кнопку
     */
    const onSubmit = useCallback(
        (data) => {
            sendEmail({
                ...data,
                files: [...(fileList || [])],
            });
            formSubmitModal.onOpen();
            reset();
        },
        [fileList, reset, formSubmitModal]
    );

    return (
        <div className={classes.root}>
            <Container className={classes.container}>
                <BlockTitle>
                    <Typography
                        variant="h4"
                        className={classes.title}
                        gutterBottom
                    >
                        Остались вопросы?{' '}
                        <Hidden smUp>
                            <br />
                        </Hidden>
                        Задайте их тут!
                    </Typography>
                </BlockTitle>
                <Hidden smDown>
                    <Typography className={classes.subtitle} gutterBottom>
                        А&nbsp;если вы&nbsp;хотите получить расчет конкретной
                        модели, прикрепите свои эскизы или план помещения
                        с&nbsp;описанием пожеланий и&nbsp;наш дизайнер
                        в&nbsp;кратчайшие сроки подготовит для вас предложение!
                    </Typography>
                </Hidden>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container>
                        <Grid item xs={1} sm={3} />
                        <Grid item xs={10} sm={6} container>
                            <Grid
                                item
                                xs={12}
                                className={classes.inputContainer}
                            >
                                <Input
                                    ref={register}
                                    name="name"
                                    placeholder="Имя"
                                    type="text"
                                    fullWidth
                                    autoComplete="name"
                                    required
                                    darkMode
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                className={classes.inputContainer}
                            >
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
                                        event.target.value = formatPhoneInput(
                                            event.target.value
                                        );
                                    }}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                className={classes.inputContainer}
                            >
                                <Input
                                    ref={register}
                                    name="email"
                                    placeholder="E-mail"
                                    type="email"
                                    fullWidth
                                    autoComplete="email"
                                    required
                                    darkMode
                                />
                            </Grid>
                            <Input
                                ref={register}
                                name="description"
                                type="text"
                                fullWidth
                                multiline
                                rows={5}
                                placeholder="Описание"
                                className={classes.textarea}
                                required
                                darkMode
                            />
                            <Grid
                                container
                                justifyContent="center"
                                className={classes.files}
                            >
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
                                    justifyContent="center"
                                    onClick={handleFileInputClick}
                                    className={classes.fileInputContainer}
                                >
                                    <PublishIcon className={classes.icon} />
                                    <Typography
                                        className={classes.fileInputText}
                                    >
                                        Прикрепить эскизы
                                    </Typography>
                                </Grid>
                                {!!fileList?.length && (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={5}
                                        container
                                        justifyContent="center"
                                    >
                                        <Typography
                                            className={classes.fileInputText}
                                        >
                                            {`${
                                                fileList.length
                                            }\xA0${getFileDeclination(
                                                fileList.length
                                            )}`}
                                            <ClearIcon
                                                className={
                                                    classes.deleteFilesIcon
                                                }
                                                onClick={
                                                    handleDeleteSelectedFiles
                                                }
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
                            justifyContent="center"
                            className={classes.buttonContainer}
                        >
                            <Grid item xs={8} sm={6} md={4}>
                                <SubmitButton>Отправить</SubmitButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={1} sm={2} md={3} />
                        <Grid item xs={10} sm={8} md={6}>
                            <Typography className={classes.text} align="center">
                                Нажимая кнопку &laquo;Рассчитать
                                стоимость&raquo;, я&nbsp;даю согласие
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
                </form>
            </Container>
        </div>
    );
};
