import React, { FC, useRef, useCallback, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container, Grid, Typography, Hidden } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import PublishIcon from '@material-ui/icons/Publish';
import ClearIcon from '@material-ui/icons/Clear';
import { formatPhoneInput, getFileDeclination } from '@/utils';
import { sendEmail } from '@/api';
import { SubmitButton, Input } from '@/components';
import { useAnalytics, useFormSubmitModal } from '@/hooks';

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#303030',
        padding: '63px 0',
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
    const analytics = useAnalytics();
    const classes = useStyles();
    const theme = useTheme();
    const formSubmitModal = useFormSubmitModal();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { register, handleSubmit, reset } = useForm();
    const [fileList, setFileList] = useState<FileList | null>(null);

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
            setFileList(fileInputRef.current.files);
        }
    }, [fileInputRef]);

    /**
     * Очищает массив сохраненных файлов
     */
    const handleClearFiles = useCallback(() => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            setFileList(null);
        }
    }, [fileInputRef]);

    /**
     * Отправляет форму
     */
    const onSubmit = useCallback(
        (data) => {
            sendEmail({
                ...data,
                files: [...(fileList || [])],
            });
            analytics.onSendEmail('proekt');
            formSubmitModal.onOpen();
            reset();
        },
        [reset, fileList, formSubmitModal, analytics]
    );

    return (
        <div className={classes.root}>
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container justifyContent="center">
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
                            <Grid item xs={12} md={6}>
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
                            <Hidden smDown>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="body2"
                                        className={classes.text}
                                    >
                                        Прикрепите, пожалуйста, эскизы вашей
                                        мебели или просто план помещения
                                        с&nbsp;описанием ваших пожеланий
                                        и&nbsp;наш дизайнер в&nbsp;кратчайшие
                                        сроки подготовит для вас свои
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
                            justifyContent="center"
                            alignItems={smDown ? 'center' : 'flex-start'}
                            className={classes.fileUploadContainer}
                        >
                            <Grid item xs={6} container justifyContent="center">
                                <input
                                    type="file"
                                    multiple
                                    ref={fileInputRef}
                                    className={classes.inputFile}
                                    onChange={handleFileUploadChange}
                                />
                                <div
                                    onClick={handleFileInputClick}
                                    className={classes.publish}
                                >
                                    <PublishIcon className={classes.icon} />
                                    <Typography className={classes.textPublish}>
                                        Прикрепить
                                        <br />
                                        эскизы
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                {!!fileList?.length && (
                                    <Grid
                                        item
                                        xs={12}
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
                            justifyContent="center"
                            className={classes.buttonContainer}
                        >
                            <Grid item xs={10} sm={6} md={4}>
                                <SubmitButton>
                                    Рассчитать стоимость
                                </SubmitButton>
                            </Grid>
                        </Grid>
                        <Grid item xs container justifyContent="center">
                            <Grid item xs={12} sm={8} md={6}>
                                <Typography
                                    className={classes.copyText}
                                    align="center"
                                >
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
                    </Grid>
                </form>
            </Container>
        </div>
    );
};
