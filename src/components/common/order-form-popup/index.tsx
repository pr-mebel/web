import React, { FC, useCallback, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Dialog, Grid, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PublishIcon from '@material-ui/icons/Publish';
import ClearIcon from '@material-ui/icons/Clear';
import { getFileDeclination } from '@/utils';
import {
    closeOrderFormPopup,
    openFormSubmitPopup,
    saveForm,
    submitForm,
    uploadFiles,
} from '@/redux';
import { orderFormPopupSelector } from '@/selectors';
import { SubmitButton } from '../submit-button';

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
    },
    input: {
        marginBottom: '10px',
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
    const [fileNames, setFileNames] = useState<FileList>(([] as unknown) as FileList);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { register, handleSubmit } = useForm();
    const { isOpen } = useSelector(orderFormPopupSelector);

    /**
     * Закрывает попап 
     */
    const handleClosePopup = useCallback(() => {
        if (fileInputRef.current) {
            dispatch(closeOrderFormPopup());
            fileInputRef.current.value = '';
        }
    }, [fileInputRef, dispatch]);

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
            setFileNames(([] as unknown) as FileList);
        }
    }, [fileInputRef]);

    /**
     * Отправляет форму
     */
    const onSubmit = useCallback(
        (data) => {
            dispatch(closeOrderFormPopup());
            dispatch(saveForm(data));
            if (fileNames.length && fileInputRef.current) {
                dispatch(uploadFiles(fileNames));
                dispatch(openFormSubmitPopup());
                fileInputRef.current.value = '';
                setFileNames(([] as unknown) as FileList);
            } else {
                dispatch(submitForm());
            }
        },
        [fileNames, fileInputRef, dispatch],
    );

    return (
        <Dialog
            open={isOpen}
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
            <Grid container justify="center" className={classes.content}>
                <Typography variant="h5" gutterBottom className={classes.title}>
                    Расчет стоимости проекта
                </Typography>
                <Grid item xs={12} className={classes.textContainer}>
                    <Typography variant="body1" align="center" className={classes.text}>
                        Отправьте эскизы, план помещения или просто напишите свои пожелания
                        к&nbsp;будущему проекту и&nbsp;мы&nbsp;подготовим для Вас индивидуальное
                        предложение
                    </Typography>
                </Grid>
                <Grid item xs={11} sm={10}>
                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            inputRef={register}
                            name="name"
                            type="text"
                            autoComplete="name"
                            className={classes.input}
                            fullWidth
                            placeholder="Имя"
                            label="Имя"
                            required
                        />
                        <TextField
                            inputRef={register}
                            name="tel"
                            type="tel"
                            autoComplete="tel"
                            className={classes.input}
                            fullWidth
                            placeholder="Телефон"
                            label="Телефон"
                            required
                        />
                        <TextField
                            inputRef={register}
                            name="email"
                            type="email"
                            autoComplete="email"
                            className={classes.input}
                            fullWidth
                            placeholder="Почта"
                            label="Почта"
                            required
                        />
                        <TextField
                            inputRef={register}
                            name="description"
                            fullWidth
                            multiline
                            label="Описание"
                            required
                            variant="outlined"
                            placeholder="Описание"
                            className={classes.input}
                            rows={5}
                        />
                        <input
                            type="file"
                            multiple
                            ref={fileInputRef}
                            className={classes.inputFile}
                            onChange={handleFileUploadChange}
                        />
                        <Grid container justify="center" className={classes.files}>
                            <Grid
                                item
                                xs={12}
                                sm={7}
                                container
                                justify="center"
                                onClick={handleFileInputClick}
                            >
                                <PublishIcon className={classes.icon} />
                                <Typography>Прикрепить эскизы</Typography>
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
                        <SubmitButton>Рассчитать стоимость</SubmitButton>
                        <Typography variant="body2" align="center" className={classes.copy}>
                            Нажимая кнопку &laquo;Рассчитать стоимость&raquo;, я&nbsp;даю согласие
                            на&nbsp;обработку персональных данных и&nbsp;подтверждаю, что ознакомлен
                            с&nbsp;
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
