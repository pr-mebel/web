import ClearIcon from '@mui/icons-material/Clear';
import PublishIcon from '@mui/icons-material/Publish';
import { Box, Dialog, Grid, Typography } from '@mui/material';
import React, { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useSendEmail } from '@/api';
import { Button, Input } from '@/components';
import { useFileUpload } from '@/hooks';
import { formatPhoneInput, getFileDeclination } from '@/utils';

type OrderFormPopupProps = {
  isOpen: boolean;
  meta?: Record<string, unknown>;
  onClose: () => void;
};

export const OrderFormPopup: FC<OrderFormPopupProps> = ({
  isOpen,
  meta,
  onClose,
}) => {
  const fileUpload = useFileUpload();
  const { register, handleSubmit } = useForm();
  const { loading, onSendEmail } = useSendEmail({
    place: 'modal',
    files: fileUpload.data,
    onFinish: () => {
      onClose();
      fileUpload.onClear();
    },
  });

  /**
   * Закрывает попап
   */
  const handleClosePopup = useCallback(() => {
    fileUpload.onClear();
    onClose();
  }, [fileUpload, onClose]);

  const handleSubmitForm = useCallback(
    (values) => {
      onSendEmail({
        ...values,
        meta,
      });
    },
    [onSendEmail, meta],
  );

  return (
    <Dialog
      open={isOpen}
      onClose={handleClosePopup}
      scroll="body"
      PaperProps={{
        sx: (theme) => ({
          position: 'relative',
          maxWidth: '434px',
          [theme.breakpoints.down('sm')]: {
            maxWidth: 'unset !important',
            width: 'calc(100% - 16px)',
            margin: 'auto',
          },
        }),
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
          background: 'rgba(255, 255, 255, 0.4)',
        }}
        onClick={handleClosePopup}
      />
      <Box
        sx={{
          width: '100%',
          position: 'relative',
          paddingTop: '27.17%',
          '& .image': {
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: '0',
            left: '0',
          },
        }}
      >
        <img
          className="image"
          src="images/common/order-form-popup/1.jpg"
          alt="Картинка в модальном окне"
        />
      </Box>
      <Grid
        container
        justifyContent="center"
        sx={{
          padding: '20px 35px 35px',
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontSize: '20px',
            fontWeight: 400,
          }}
        >
          Расчет стоимости проекта
        </Typography>
        <Grid
          item
          xs={12}
          sx={(theme) => ({
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
          })}
        >
          <Typography
            variant="body1"
            align="center"
            sx={{
              fontSize: '14px',
              lineHeight: '16.8px',
            }}
          >
            Отправьте эскизы, план помещения или просто напишите свои пожелания
            к&nbsp;будущему проекту и&nbsp;мы&nbsp;подготовим для Вас
            индивидуальное предложение
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box
            component="form"
            sx={{
              margin: '35px auto 0',
              display: 'grid',
              gridTemplateColumns: '1fr',
              rowGap: '15px',
              maxWidth: '255px',
            }}
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <Input
              inputRef={register}
              name="name"
              placeholder="Имя"
              type="text"
              fullWidth
              autoComplete="name"
              required
            />
            <Input
              inputRef={register}
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
              inputRef={register}
              name="email"
              placeholder="E-mail"
              type="email"
              fullWidth
              autoComplete="email"
            />
            <Input
              inputRef={register}
              name="description"
              placeholder="Описание"
              type="text"
              fullWidth
              multiline
              rows={4}
            />
            {fileUpload.renderFileInput()}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={fileUpload.onClick}
            >
              <PublishIcon
                sx={{
                  marginRight: '5px',
                }}
              />
              <Typography
                sx={{
                  fontSize: '12px',
                  lineHeight: '1.4',
                  position: 'relative',
                  textTransform: 'uppercase',
                }}
              >
                Прикрепить эскизы
              </Typography>
            </Box>
            {!!fileUpload.data?.length && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '12px',
                    lineHeight: '1.4',
                    position: 'relative',
                  }}
                >
                  {`${fileUpload.data.length}\xA0${getFileDeclination(
                    fileUpload.data.length,
                  )}`}
                  <ClearIcon
                    sx={{
                      cursor: 'pointer',
                      width: '16px',
                      height: '16px',
                      position: 'absolute',
                      right: '-20px',
                      bottom: '0px',
                    }}
                    onClick={fileUpload.onClear}
                  />
                </Typography>
              </Box>
            )}
            <Button type="submit" loading={loading}>
              Рассчитать стоимость
            </Button>
          </Box>
        </Grid>
        <Typography
          variant="body2"
          align="center"
          sx={{
            marginTop: '15px',
            fontSize: '14px',
            lineHeight: '1',
          }}
        >
          Нажимая кнопку &laquo;Рассчитать стоимость&raquo;, я&nbsp;даю согласие
          на&nbsp;обработку персональных данных и&nbsp;подтверждаю, что
          ознакомлен с&nbsp;
          <Box
            component="a"
            href="https://docs.google.com/document/d/1KSM18JIPpeT6weSQaG3dgpTEC9MO3wvxYWsrF2A6CZE/edit"
            sx={{
              color: 'black',
            }}
          >
            пользовательским соглашением
          </Box>
        </Typography>
      </Grid>
    </Dialog>
  );
};
