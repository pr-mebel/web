import ClearIcon from '@mui/icons-material/Clear';
import PublishIcon from '@mui/icons-material/Publish';
import {
  Box,
  Container,
  Grid,
  Hidden,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useYaCounter54949111 } from '@/analytics';
import { useSendEmail } from '@/api';
import { Button, ButtonContainer, Input } from '@/components';
import { useFileUpload } from '@/hooks';
import { formatPhoneInput, getFileDeclination } from '@/utils';

export const FeedbackForm: FC = () => {
  const fileUpload = useFileUpload();
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const analytics = useYaCounter54949111();
  const { register, handleSubmit, reset, formState } = useForm();
  const { loading, onSendEmail } = useSendEmail({
    place: 'home/calculate-price',
    files: fileUpload.data,
    onFinish: () => {
      fileUpload.onClear();
      reset();
    },
  });

  useEffect(() => {
    if (formState.isDirty) {
      analytics.track('inquiry/not-modal/first-touch');
    }
  }, [analytics, formState.isDirty]);

  return (
    <Box
      sx={{
        background: '#303030',
        padding: '63px 0',
      }}
    >
      <Container>
        <form onSubmit={handleSubmit(onSendEmail)}>
          <Grid container justifyContent="center">
            <Grid item xs={1} />
            <Grid
              item
              xs={10}
              md={6}
              container
              direction="row"
              spacing={isMdDown ? 2 : 4}
            >
              <Grid item xs={12} md={6}>
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
              </Grid>
              <Grid item xs={12} md={6}>
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
              </Grid>
              <Hidden smDown>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 300,
                      lineHeight: '14px',
                    }}
                  >
                    Прикрепите, пожалуйста, эскизы вашей мебели или просто план
                    помещения с&nbsp;описанием ваших пожеланий и&nbsp;наш
                    дизайнер в&nbsp;кратчайшие сроки подготовит для вас свои
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
              alignItems={isMdDown ? 'center' : 'flex-start'}
              sx={(theme) => ({
                position: 'relative',
                [theme.breakpoints.up('sm')]: {
                  paddingTop: '16px',
                },
                [theme.breakpoints.down('sm')]: {
                  marginTop: '20px',
                },
              })}
            >
              <Grid item xs={6} container justifyContent="center">
                {fileUpload.renderFileInput()}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    cursor: 'pointer',
                  }}
                  onClick={fileUpload.onClick}
                >
                  <PublishIcon
                    sx={{
                      color: theme.palette.primary.main,
                      width: '30px',
                      height: '30px',
                    }}
                  />
                  <Typography
                    sx={{
                      color: 'white',
                      textTransform: 'uppercase',
                      fontSize: '12px',
                      lineHeight: '14px',
                      marginLeft: '4px',
                    }}
                  >
                    Прикрепить
                    <br />
                    эскизы
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                {!!fileUpload.data?.length && (
                  <Grid item xs={12} container justifyContent="center">
                    <Typography
                      sx={{
                        color: 'white',
                        position: 'relative',
                        fontSize: '16px',
                      }}
                    >
                      {`${fileUpload.data.length}\xA0${getFileDeclination(
                        fileUpload.data.length,
                      )}`}
                      <ClearIcon
                        sx={{
                          cursor: 'pointer',
                          color: 'white',
                          width: '20px',
                          height: '20px',
                          position: 'absolute',
                          right: '-30px',
                          bottom: '1px',
                        }}
                        onClick={fileUpload.onClear}
                      />
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                marginTop: '36px',
                marginBottom: '24px',
              }}
            >
              <ButtonContainer>
                <Button type="submit" loading={loading} block>
                  Рассчитать стоимость
                </Button>
              </ButtonContainer>
            </Grid>
            <Grid item xs container justifyContent="center">
              <Grid item xs={12} sm={8} md={6}>
                <Typography
                  sx={{
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 300,
                    lineHeight: '12px',
                  }}
                  align="center"
                >
                  Нажимая кнопку &laquo;Рассчитать стоимость&raquo;, я&nbsp;даю
                  согласие на&nbsp;обработку персональных данных
                  и&nbsp;подтверждаю, что ознакомлен с&nbsp;
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
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};
