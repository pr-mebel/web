import { Container, Hidden, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import PublishIcon from '@material-ui/icons/Publish';
import React, { FC, useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useSendEmail } from '@/api';
import { BlockTitle, Input, SubmitButton } from '@/components';
import { useAnalytics, useFormSubmitModal } from '@/hooks';
import { formatPhoneInput, getFileDeclination } from '@/utils';

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
    form: {
        maxWidth: '380px',
        margin: '20px auto 0',
        background: 'rgba(89, 89, 89, 0.46)',
        borderRadius: '5px',
        padding: '40px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        rowGap: '15px',
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
        margin: '20px auto 0',
        maxWidth: '545px',
        color: 'white',
        fontSize: '12px',
        fontWeight: 100,
        lineHeight: '100%',
    },
    copyrightLink: {
        color: 'white',
    },
    inputFile: {
        display: 'none',
    },
    fileInputContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10px',
        cursor: 'pointer',
    },
    icon: {
        marginRight: '5px',
        color: 'white',
    },
    deleteFilesIcon: {
        cursor: 'pointer',
        color: 'white',
        width: '16px',
        height: '16px',
        position: 'absolute',
        right: '-20px',
        bottom: '0',
    },
    fileInputText: {
        fontSize: '12px',
        lineHeight: '1.4',
        color: 'white',
        position: 'relative',
    },
    fileListWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export const Questions: FC = () => {
    const analytics = useAnalytics();
    const classes = useStyles();
    const formSubmitModal = useFormSubmitModal();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<File[]>([]);
    const { register, handleSubmit, reset } = useForm();
    const { onSendEmail } = useSendEmail({ place: 'Каталог/Остались вопросы?' });

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
        if (fileInputRef.current?.files && fileInputRef.current.files) {
            const files = fileInputRef.current.files;

            setFileList((prev) => [...prev, ...files]);
        }
    }, [fileInputRef]);

    /**
     * Удаляет выбранные файлы
     */
    const handleDeleteSelectedFiles = useCallback(() => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            setFileList([]);
        }
    }, []);

    /**
     * Отправляет форму после клика на кнопку
     */
    const onSubmit = useCallback(
        (data) => {
            onSendEmail({
                ...data,
                files: fileList,
            });
            analytics.onSendEmail('vopros_katalog');
            formSubmitModal.onOpen();
            reset();
        },
        [fileList, reset, formSubmitModal, analytics, onSendEmail]
    );

    return (
        <div className={classes.root}>
            <Container className={classes.container}>
                <BlockTitle>
                    <Typography variant="h4" className={classes.title} gutterBottom>
                        Остались вопросы?{' '}
                        <Hidden smUp>
                            <br />
                        </Hidden>
                        Задайте их тут!
                    </Typography>
                </BlockTitle>
                <Hidden smDown>
                    <Typography className={classes.subtitle} gutterBottom>
                        А&nbsp;если вы&nbsp;хотите получить расчет конкретной модели, прикрепите свои эскизы или план
                        помещения с&nbsp;описанием пожеланий и&nbsp;наш дизайнер в&nbsp;кратчайшие сроки подготовит для
                        вас предложение!
                    </Typography>
                </Hidden>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
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
                    <Input
                        ref={register}
                        name="email"
                        placeholder="E-mail"
                        type="email"
                        fullWidth
                        autoComplete="email"
                        darkMode
                    />
                    <Input
                        ref={register}
                        name="description"
                        type="text"
                        fullWidth
                        multiline
                        rows={5}
                        placeholder="Ваш вопрос"
                        className={classes.textarea}
                        darkMode
                    />
                    <div className={classes.fileInputContainer} onClick={handleFileInputClick}>
                        <input
                            type="file"
                            multiple
                            ref={fileInputRef}
                            className={classes.inputFile}
                            onChange={handleFileUploadChange}
                        />
                        <PublishIcon className={classes.icon} />
                        <Typography className={classes.fileInputText} style={{ textTransform: 'uppercase' }}>
                            Прикрепить эскизы
                        </Typography>
                    </div>
                    {!!fileList?.length && (
                        <div className={classes.fileListWrapper}>
                            <Typography className={classes.fileInputText}>
                                {`${fileList.length}\xA0${getFileDeclination(fileList.length)}`}
                                <ClearIcon className={classes.deleteFilesIcon} onClick={handleDeleteSelectedFiles} />
                            </Typography>
                        </div>
                    )}
                    <SubmitButton>Отправить</SubmitButton>
                </form>
                <Typography className={classes.text} align="center">
                    Нажимая кнопку &laquo;Рассчитать стоимость&raquo;, я&nbsp;даю согласие на&nbsp;обработку
                    персональных данных и&nbsp;подтверждаю, что ознакомлен с&nbsp;
                    <a
                        href="https://docs.google.com/document/d/1KSM18JIPpeT6weSQaG3dgpTEC9MO3wvxYWsrF2A6CZE/edit"
                        className={classes.copyrightLink}
                    >
                        пользовательским соглашением
                    </a>
                </Typography>
            </Container>
        </div>
    );
};
