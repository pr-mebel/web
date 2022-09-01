import ClearIcon from '@mui/icons-material/Clear';
import PublishIcon from '@mui/icons-material/Publish';
import { Box, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

import { useSendEmail } from '@/api';
import { BlockTitle, Button, Input } from '@/components';
import { useAnalytics, useFileUpload } from '@/hooks';
import { formatPhoneInput, getFileDeclination } from '@/utils';

export const Questions: FC = () => {
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const analytics = useAnalytics();
    const fileUpload = useFileUpload();
    const { register, handleSubmit, reset } = useForm();
    const { loading, onSendEmail } = useSendEmail({
        place: 'catalog/more-questions',
        files: fileUpload.data,
        onFinish: () => {
            analytics.onSendEmail('vopros_katalog');
            fileUpload.onClear();
            reset();
        },
    });

    return (
        <Box
            sx={{
                backgroundImage: 'url("images/catalog/questions/1.jpg")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '80px 0',
            }}
        >
            <Container
                sx={{
                    position: 'relative',
                    zIndex: 10,
                }}
            >
                <BlockTitle>
                    <Typography
                        variant="h4"
                        sx={{
                            color: 'white',
                        }}
                        gutterBottom
                    >
                        Остались вопросы? {isMdDown && <br />}
                        Задайте их тут!
                    </Typography>
                </BlockTitle>
                {!isMdDown && (
                    <Typography
                        sx={{
                            margin: '40px 0',
                            color: 'white',
                        }}
                        gutterBottom
                    >
                        А&nbsp;если вы&nbsp;хотите получить расчет конкретной модели, прикрепите свои эскизы или план
                        помещения с&nbsp;описанием пожеланий и&nbsp;наш дизайнер в&nbsp;кратчайшие сроки подготовит для
                        вас предложение!
                    </Typography>
                )}
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSendEmail)}
                    sx={{
                        maxWidth: '380px',
                        margin: '20px auto 0',
                        background: 'rgba(89, 89, 89, 0.46)',
                        borderRadius: '5px',
                        padding: '40px',
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        rowGap: '15px',
                    }}
                >
                    <Input
                        inputRef={register}
                        name="name"
                        placeholder="Имя"
                        type="text"
                        fullWidth
                        autoComplete="name"
                        required
                        darkMode
                    />
                    <Input
                        inputRef={register}
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
                        inputRef={register}
                        name="email"
                        placeholder="E-mail"
                        type="email"
                        fullWidth
                        autoComplete="email"
                        darkMode
                    />
                    <Input
                        inputRef={register}
                        name="description"
                        type="text"
                        fullWidth
                        multiline
                        rows={5}
                        placeholder="Ваш вопрос"
                        sx={{
                            marginTop: '20px',
                        }}
                        darkMode
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '10px',
                            cursor: 'pointer',
                            '& .icon': {
                                marginRight: '5px',
                                color: 'white',
                            },
                            '& .fileInputText': {
                                fontSize: '12px',
                                lineHeight: '1.4',
                                color: 'white',
                                position: 'relative',
                                textTransform: 'uppercase',
                            },
                        }}
                        onClick={fileUpload.onClick}
                    >
                        {fileUpload.renderFileInput()}
                        <PublishIcon className="icon" />
                        <Typography className="fileInputText">Прикрепить эскизы</Typography>
                    </Box>
                    {!!fileUpload.data?.length && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                '& .fileInputText': {
                                    fontSize: '12px',
                                    lineHeight: '1.4',
                                    color: 'white',
                                    position: 'relative',
                                },
                                '& .icon': {
                                    cursor: 'pointer',
                                    color: 'white',
                                    width: '16px',
                                    height: '16px',
                                    position: 'absolute',
                                    right: '-20px',
                                    bottom: '0',
                                },
                            }}
                        >
                            <Typography className="fileInputText">
                                {`${fileUpload.data.length}\xA0${getFileDeclination(fileUpload.data.length)}`}
                                <ClearIcon className="icon" onClick={fileUpload.onClear} />
                            </Typography>
                        </Box>
                    )}
                    <Button type="submit" loading={loading}>
                        Отправить
                    </Button>
                </Box>
                <Typography
                    sx={{
                        margin: '20px auto 0',
                        maxWidth: '545px',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 100,
                        lineHeight: '100%',
                    }}
                    align="center"
                >
                    Нажимая кнопку &laquo;Рассчитать стоимость&raquo;, я&nbsp;даю согласие на&nbsp;обработку
                    персональных данных и&nbsp;подтверждаю, что ознакомлен с&nbsp;
                    <Box
                        component="a"
                        href="https://docs.google.com/document/d/1KSM18JIPpeT6weSQaG3dgpTEC9MO3wvxYWsrF2A6CZE/edit"
                        sx={{
                            color: 'white',
                        }}
                    >
                        пользовательским соглашением
                    </Box>
                </Typography>
            </Container>
        </Box>
    );
};
