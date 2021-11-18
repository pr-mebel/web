import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, Grid, Typography, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { submitForm, closeFormSubmitPopup } from '@/redux';
import ClearIcon from '@material-ui/icons/Clear';
import { getFormState } from '@/selectors';

const useStyles = makeStyles({
    root: {
        padding: '40px',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
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
    container: {
        flexGrow: 1,
    },
    textContainer: {
        margin: '0',
    },
    textMain: {
        fontWeight: 'bold',
        fontSize: '32px',
        marginBottom: '20px',
    },
    icon: {
        display: 'inline-block',
        marginRight: '20px',
        position: 'relative',
        top: '10px',
    },
});

export const FormSubmitPopup: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { files, isOpen } = useSelector(getFormState);

    /**
     * Флаг, показывающий, что все выбранные файлы загружены
     */
    const allUploaded = useMemo(
        () => files.every((file) => file.progress === 100) || !files.length,
        [files],
    );

    /**
     * Процент полностью загруженных файлов
     */
    const percentageOfUploaded = useMemo(() =>
        (files.reduce((acc, curr) => {
            if (curr.progress === 100) {
                return acc + 1;
            }

            return acc;
        }, 0) / files.length) * 100,
    [files],
    );

    const handleClose = useCallback(() => {
        dispatch(closeFormSubmitPopup());
    }, [dispatch]);

    /**
     * Отправляет форму после того как все файлы загружены
     */
    useEffect(() => {
        if (allUploaded && files.length) {
            dispatch(submitForm());
        }
    }, [allUploaded, files, dispatch]);

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
            <div className={classes.root}>
                <ClearIcon className={classes.closeIcon} onClick={handleClose} />
                <Typography variant="body1" align="center" gutterBottom>
                    {!allUploaded ? (
                        'Загрузка файлов'
                    ) : (
                        <>
                            <img
                                src="images/common/form-submit-popup/1.svg"
                                alt="Письмо отправлено"
                                className={classes.icon}
                            />
                            <span>Письмо отправлено</span>
                        </>
                    )}
                </Typography>
                <Grid container justifyContent="center" alignItems="center" className={classes.container}>
                    {!allUploaded ? (
                        <CircularProgress size={80} variant="static" value={percentageOfUploaded} />
                    ) : (
                        <Grid item xs={12} className={classes.textContainer}>
                            <Typography align="center" className={classes.textMain}>
                                Спасибо за обращение!
                            </Typography>
                            <Typography align="center">
                                Наши менеджеры обязательно
                                <br />
                                свяжутся с Вами в блажйшее время.
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </div>
        </Dialog>
    );
};
