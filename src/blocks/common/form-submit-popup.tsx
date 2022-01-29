import { Dialog, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import React, { FC, useEffect } from 'react';

import { useFormSubmitModal } from '@/hooks';

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
    const formSubmitModal = useFormSubmitModal();

    useEffect(() => {
        if (formSubmitModal.isOpen) {
            setTimeout(() => formSubmitModal.onClose(), 5000);
        }
    }, [formSubmitModal]);

    return (
        <Dialog open={formSubmitModal.isOpen} onClose={formSubmitModal.onClose} fullWidth maxWidth="sm">
            <div className={classes.root}>
                <ClearIcon className={classes.closeIcon} onClick={formSubmitModal.onClose} />
                <Typography variant="body1" align="center" gutterBottom>
                    <img src="images/common/form-submit-popup/1.svg" alt="Письмо отправлено" className={classes.icon} />
                    <span>Письмо отправлено</span>
                </Typography>
                <Grid container justifyContent="center" alignItems="center" className={classes.container}>
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
                </Grid>
            </div>
        </Dialog>
    );
};
