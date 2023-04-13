import ClearIcon from '@mui/icons-material/Clear';
import { Box, Dialog, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';

type FormSubmitPopupProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const FormSubmitPopup: FC<FormSubmitPopupProps> = ({ isOpen, onClose }) => {
    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
            <Box
                sx={{
                    padding: '40px',
                    minHeight: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                }}
            >
                <ClearIcon
                    sx={{
                        cursor: 'pointer',
                        width: '30px',
                        height: '30px',
                        top: '5px',
                        right: '5px',
                        position: 'absolute',
                        zIndex: 10,
                    }}
                    onClick={onClose}
                />
                <Typography
                    variant="body1"
                    align="center"
                    gutterBottom
                    sx={{
                        '& .icon': {
                            display: 'inline-block',
                            marginRight: '20px',
                            position: 'relative',
                            top: '10px',
                        },
                    }}
                >
                    <img src="images/common/form-submit-popup/1.svg" alt="Письмо отправлено" className="icon" />
                    <span>Письмо отправлено</span>
                </Typography>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        sx={{
                            margin: '0',
                        }}
                    >
                        <Typography
                            align="center"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '32px',
                                marginBottom: '20px',
                            }}
                        >
                            Спасибо за обращение!
                        </Typography>
                        <Typography align="center">
                            Наши менеджеры обязательно
                            <br />
                            свяжутся с Вами в блажйшее время.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    );
};
