import { Container, Grid } from '@mui/material';
import React, { FC } from 'react';

import { DesignCard, Icon } from './components';

export const DesignOfferIcons: FC = () => (
  <Container>
    <Grid
      container
      sx={(theme) => ({
        marginTop: '48px',
        [theme.breakpoints.down('sm')]: {
          marginTop: '24px',
        },
      })}
      spacing={4}
    >
      <Grid item xs={12} sm={6} md={3}>
        <DesignCard img={<Icon id={0} />}>
          Пришлите нам эскизы вашей мебели или просто оставьте свои контактные
          данные
        </DesignCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DesignCard img={<Icon id={1} />}>
          При необходимости, мы&nbsp;уточним детали и&nbsp;бесплатно разработаем
          проект в&nbsp;ЗД
        </DesignCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DesignCard img={<Icon id={2} />}>
          Предложим разные варианты наполнение шкафа или гардеробной
        </DesignCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DesignCard img={<Icon id={3} />}>
          Сформируем лучшее предложение в рамках бюджета
        </DesignCard>
      </Grid>
    </Grid>
  </Container>
);
