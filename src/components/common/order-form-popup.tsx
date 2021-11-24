import React, { FC, useCallback, useContext, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Dialog, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PublishIcon from '@material-ui/icons/Publish';
import ClearIcon from '@material-ui/icons/Clear';
import { formatPhoneInput, getFileDeclination, orderFormCtx } from '@/utils';
import {
    openFormSubmitPopup,
    saveForm,
    submitForm,
    uploadFiles,
} from '@/redux';
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
        marginTop: '20px',
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
    const classes = useStyles();
    const dispatch = useDispatch();
    const orderForm = useContext(orderFormCtx);
    const [fileNames, setFileNames] = useState<FileList>(
        [] as unknown as FileList
    );
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { register, handleSubmit } = useForm();

    /**
     * Закрывает попап
     */
    const handleClosePopup = useCallback(() => {
        if (fileInputRef.current) {
            orderForm.onClose();
            fileInputRef.current.value = '';
        }
    }, [fileInputRef, orderForm]);

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
        if (fileInputRef.current?.files) {
            setFileNames(fileInputRef.current.files);
        }
    }, [fileInputRef]);

    /**
     * Очищает загруженные файлы
     */
    const handleDeleteSelectedFiles = useCallback(() => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            setFileNames([] as unknown as FileList);
        }
    }, [fileInputRef]);

    /**
     * Отправляет форму
     */
    const onSubmit = useCallback(
        (data) => {
            orderForm.onClose();
            dispatch(saveForm(data));
            if (fileNames.length && fileInputRef.current) {
                dispatch(uploadFiles(fileNames));
                dispatch(openFormSubmitPopup());
                fileInputRef.current.value = '';
                setFileNames([] as unknown as FileList);
            } else {
                dispatch(submitForm());
            }
        },
        [fileNames, fileInputRef, dispatch, orderForm]
    );

    return (
        <Dialog
            open={orderForm.isOpen}
            onClose={handleClosePopup}
            scroll="body"
            fullWidth
            maxWidth="xs"
            PaperProps={{
                className: classes.paperRoot,
            }}
        >
            <ClearIcon
                className={classes.closeIcon}
                onClick={handleClosePopup}
            />
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
                    <Typography
                        variant="body1"
                        align="center"
                        className={classes.text}
                    >
                        Отправьте эскизы, план помещения или просто напишите
                        свои пожелания к&nbsp;будущему проекту
                        и&nbsp;мы&nbsp;подготовим для Вас индивидуальное
                        предложение
                    </Typography>
                </Grid>
                <Grid item xs={11} sm={10}>
                    <form
                        className={classes.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
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
                                event.target.value = formatPhoneInput(
                                    event.target.value
                                );
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
                            inputRef={register}
                            name="description"
                            fullWidth
                            multiline
                            rows={5}
                            required
                            placeholder="Описание"
                        />
                        <input
                            type="file"
                            multiple
                            ref={fileInputRef}
                            className={classes.inputFile}
                            onChange={handleFileUploadChange}
                        />
                        <Grid
                            container
                            justifyContent="center"
                            className={classes.files}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={7}
                                container
                                justifyContent="center"
                                onClick={handleFileInputClick}
                            >
                                <PublishIcon className={classes.icon} />
                                <Typography>Прикрепить эскизы</Typography>
                            </Grid>
                            {!!fileNames.length && (
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
                                            fileNames.length
                                        }\xA0${getFileDeclination(
                                            fileNames.length
                                        )}`}
                                        <ClearIcon
                                            className={classes.deleteFilesIcon}
                                            onClick={handleDeleteSelectedFiles}
                                        />
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                        <SubmitButton>Рассчитать стоимость</SubmitButton>
                        <Typography
                            variant="body2"
                            align="center"
                            className={classes.copy}
                        >
                            Нажимая кнопку &laquo;Рассчитать стоимость&raquo;,
                            я&nbsp;даю согласие на&nbsp;обработку персональных
                            данных и&nbsp;подтверждаю, что ознакомлен с&nbsp;
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
