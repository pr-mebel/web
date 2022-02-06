import { Dialog, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import PublishIcon from '@material-ui/icons/Publish';
import React, { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useSendEmail } from '@/api';
import { Input, SubmitButton } from '@/components';
import { useAnalytics, useContactFormModal, useFileUpload } from '@/hooks';
import { formatPhoneInput, getFileDeclination } from '@/utils';

const useStyles = makeStyles((theme) => ({
    paperRoot: {
        position: 'relative',
        maxWidth: '434px',
    },
    content: {
        padding: '20px 35px 35px',
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
        margin: '35px auto 0',
        display: 'grid',
        gridTemplateColumns: '1fr',
        rowGap: '15px',
        maxWidth: '255px',
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
        width: '16px',
        height: '16px',
        position: 'absolute',
        right: '-20px',
        bottom: '0px',
    },
    fileInputContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    fileInputText: {
        fontSize: '12px',
        lineHeight: '1.4',
        position: 'relative',
    },
    fileListWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    [theme.breakpoints.down('xs')]: {
        paperRoot: {
            maxWidth: 'unset !important',
            width: 'calc(100% - 16px)',
            margin: 'auto',
        },
    },
}));

export const OrderFormPopup: FC = () => {
    const fileUpload = useFileUpload();
    const analytics = useAnalytics();
    const classes = useStyles();
    const contactFormModal = useContactFormModal();
    const { register, handleSubmit } = useForm();
    const { loading, onSendEmail } = useSendEmail({
        place: 'Модальное окно',
        files: fileUpload.data,
        onFinish: () => {
            contactFormModal.onClose();
            analytics.onSendEmail('zakazat_modal');
            analytics.onContactMeModalSubmitted();
            fileUpload.onClear();
        },
    });

    /**
     * Закрывает попап
     */
    const handleClosePopup = useCallback(() => {
        fileUpload.onClear();
        contactFormModal.onClose();
    }, [fileUpload, contactFormModal]);

    return (
        <Dialog
            open={contactFormModal.isOpen}
            onClose={handleClosePopup}
            scroll="body"
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
                <Grid item xs={12}>
                    <form className={classes.form} onSubmit={handleSubmit(onSendEmail)}>
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
                        />
                        <Input
                            ref={register}
                            name="description"
                            placeholder="Описание"
                            type="text"
                            fullWidth
                            multiline
                            rows={5}
                        />
                        {fileUpload.renderFileInput()}
                        <div className={classes.fileInputContainer} onClick={fileUpload.onClick}>
                            <PublishIcon className={classes.icon} />
                            <Typography className={classes.fileInputText} style={{ textTransform: 'uppercase' }}>
                                Прикрепить эскизы
                            </Typography>
                        </div>
                        {!!fileUpload.data?.length && (
                            <div className={classes.fileListWrapper}>
                                <Typography className={classes.fileInputText}>
                                    {`${fileUpload.data.length}\xA0${getFileDeclination(fileUpload.data.length)}`}
                                    <ClearIcon className={classes.deleteFilesIcon} onClick={fileUpload.onClear} />
                                </Typography>
                            </div>
                        )}
                        <SubmitButton loading={loading}>Рассчитать стоимость</SubmitButton>
                    </form>
                </Grid>
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
            </Grid>
        </Dialog>
    );
};
