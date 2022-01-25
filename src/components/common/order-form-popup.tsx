import { Dialog, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import PublishIcon from '@material-ui/icons/Publish';
import React, { FC, useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useSendEmail } from '@/api';
import { useAnalytics, useContactFormModal, useFormSubmitModal } from '@/hooks';
import { formatPhoneInput, getFileDeclination } from '@/utils';

import { Input } from './input';
import { SubmitButton } from './submit-button';

const useStyles = makeStyles((theme) => ({
    paperRoot: {
        position: 'relative',
    },
    content: {
        padding: '20px',
    },
    title: {
        fontSize: '20px',
        fontWeight: 400,
    },
    closeIcon: {
        cursor: 'pointer',
        width: '30px',
        height: '30px',
        top: '5px',
        right: '5px',
        position: 'absolute',
        zIndex: 10,
        background: 'rgba(255, 255, 255, 0.4)',
    },
    text: {
        fontSize: '14px',
        lineHeight: '16.8px',
    },
    textContainer: {
        position: 'relative',
        '&::after': {
            position: 'absolute',
            content: '""',
            bottom: '-15px',
            left: '25%',
            width: '50%',
            height: '1px',
            background: theme.palette.primary.main,
        },
    },
    form: {
        marginTop: '30px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        rowGap: '10px',
    },
    inputFile: {
        display: 'none',
    },
    imgContainer: {
        width: '100%',
        position: 'relative',
        paddingTop: '27.17%',
    },
    img: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: '0',
        left: '0',
    },
    files: {
        marginTop: '10px',
        marginBottom: '20px',
        cursor: 'pointer',
    },
    icon: {
        marginRight: '5px',
    },
    copy: {
        marginTop: '15px',
        fontSize: '14px',
        lineHeight: '1',
    },
    copyrightLink: {
        color: 'black',
    },
    deleteFilesIcon: {
        cursor: 'pointer',
        width: '20px',
        height: '20px',
        position: 'absolute',
        right: '-30px',
        bottom: '1px',
    },
    fileInputText: {
        position: 'relative',
    },
    [theme.breakpoints.down('xs')]: {
        paperRoot: {
            maxWidth: 'unset !important',
            width: 'calc(100% - 8px)',
            margin: 'auto',
        },
    },
}));

export const OrderFormPopup: FC = () => {
    const analytics = useAnalytics();
    const classes = useStyles();
    const contactFormModal = useContactFormModal();
    const formSubmitModal = useFormSubmitModal();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<File[]>([]);
    const { register, handleSubmit } = useForm();
    const { onSendEmail } = useSendEmail({ place: 'Модальное окно' });

    /**
     * Закрывает попап
     */
    const handleClosePopup = useCallback(() => {
        if (fileInputRef.current) {
            contactFormModal.onClose();
            fileInputRef.current.value = '';
        }
    }, [fileInputRef, contactFormModal]);

    /**
     * Имитирует клик по инпуту файлов
     */
    const handleFileInputClick = useCallback(() => {
        fileInputRef.current?.click();
    }, [fileInputRef]);

    /**
     * Сохраняет новые загруженные файлы в массив
     */
    const handleFileUploadChange = useCallback(() => {
        if (fileInputRef.current?.files && fileInputRef.current.files) {
            const files = fileInputRef.current.files;
            setFileList((prev) => [...prev, ...files]);
        }
    }, [fileInputRef]);

    /**
     * Очищает загруженные файлы
     */
    const handleDeleteSelectedFiles = useCallback(() => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            setFileList([]);
        }
    }, [fileInputRef]);

    /**
     * Отправляет форму
     */
    const onSubmit = useCallback(
        (data) => {
            contactFormModal.onClose();
            onSendEmail({
                ...data,
                files: fileList,
            });
            analytics.onSendEmail('zakazat_modal');
            analytics.onContactMeModalSubmitted();
            formSubmitModal.onOpen();
        },
        [fileList, contactFormModal, formSubmitModal, analytics, onSendEmail]
    );

    return (
        <Dialog
            open={contactFormModal.isOpen}
            onClose={handleClosePopup}
            scroll="body"
            fullWidth
            maxWidth="xs"
            PaperProps={{
                className: classes.paperRoot,
            }}
        >
            <ClearIcon className={classes.closeIcon} onClick={handleClosePopup} />
            <div className={classes.imgContainer}>
                <img
                    className={classes.img}
                    src="images/common/order-form-popup/1.jpg"
                    alt="Картинка в модальном окне"
                />
            </div>
            <Grid container justifyContent="center" className={classes.content}>
                <Typography variant="h5" gutterBottom className={classes.title}>
                    Расчет стоимости проекта
                </Typography>
                <Grid item xs={12} className={classes.textContainer}>
                    <Typography variant="body1" align="center" className={classes.text}>
                        Отправьте эскизы, план помещения или просто напишите свои пожелания к&nbsp;будущему проекту
                        и&nbsp;мы&nbsp;подготовим для Вас индивидуальное предложение
                    </Typography>
                </Grid>
                <Grid item xs={9} sm={8}>
                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            ref={register}
                            name="name"
                            placeholder="Имя"
                            type="text"
                            fullWidth
                            autoComplete="name"
                            required
                        />
                        <Input
                            ref={register}
                            name="tel"
                            placeholder="Телефон"
                            type="tel"
                            fullWidth
                            autoComplete="tel"
                            required
                            onChange={(event) => {
                                event.target.value = formatPhoneInput(event.target.value);
                            }}
                        />
                        <Input
                            ref={register}
                            name="email"
                            placeholder="E-mail"
                            type="email"
                            fullWidth
                            autoComplete="email"
                            required
                        />
                        <Input
                            ref={register}
                            name="description"
                            placeholder="Описание"
                            type="text"
                            fullWidth
                            multiline
                            rows={5}
                            required
                        />
                        <input
                            type="file"
                            multiple
                            ref={fileInputRef}
                            className={classes.inputFile}
                            onChange={handleFileUploadChange}
                        />
                        <Grid container justifyContent="center" className={classes.files}>
                            <Grid item xs={12} container justifyContent="center" onClick={handleFileInputClick}>
                                <PublishIcon className={classes.icon} />
                                <Typography>Прикрепить эскизы</Typography>
                            </Grid>
                            {!!fileList?.length && (
                                <Grid item xs={12} container justifyContent="center">
                                    <Typography className={classes.fileInputText}>
                                        {`${fileList.length}\xA0${getFileDeclination(fileList.length)}`}
                                        <ClearIcon
                                            className={classes.deleteFilesIcon}
                                            onClick={handleDeleteSelectedFiles}
                                        />
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                        <SubmitButton>Рассчитать стоимость</SubmitButton>
                        <Typography variant="body2" align="center" className={classes.copy}>
                            Нажимая кнопку &laquo;Рассчитать стоимость&raquo;, я&nbsp;даю согласие на&nbsp;обработку
                            персональных данных и&nbsp;подтверждаю, что ознакомлен с&nbsp;
                            <a
                                href="https://docs.google.com/document/d/1KSM18JIPpeT6weSQaG3dgpTEC9MO3wvxYWsrF2A6CZE/edit"
                                className={classes.copyrightLink}
                            >
                                пользовательским соглашением
                            </a>
                        </Typography>
                    </form>
                </Grid>
            </Grid>
        </Dialog>
    );
};
