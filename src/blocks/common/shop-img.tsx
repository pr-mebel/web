import { Box } from '@mui/material';
import Image from 'next/legacy/image';
import img from 'public/images/common/shop-img/1.png';
import React, { FC } from 'react';

export const ShopImg: FC = () => (
  <Box
    sx={{
      width: '100%',
      paddingTop: '30%',
      position: 'relative',
    }}
  >
    <Image
      src={img}
      layout="fill"
      alt="Изображение салона"
      placeholder="blur"
    />
  </Box>
);
