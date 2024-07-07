import Image from 'next/legacy/image';
import img1 from 'public/images/home-page/catalog/1.jpg';
import img2 from 'public/images/home-page/catalog/2.jpg';
import img3 from 'public/images/home-page/catalog/3.jpg';
import img4 from 'public/images/home-page/catalog/4.jpg';
import img5 from 'public/images/home-page/catalog/5.jpg';
import img6 from 'public/images/home-page/catalog/6.jpg';
import React, { FC } from 'react';

type Props = {
  id: number;
};

export const CardImage: FC<Props> = ({ id }) => {
  switch (id) {
    case 0:
      return (
        <Image
          src={img1}
          alt="Шкафы классические"
          layout="fill"
          placeholder="blur"
          quality={100}
        />
      );
    case 1:
      return (
        <Image
          src={img2}
          alt="Шкафы современные"
          layout="fill"
          placeholder="blur"
          quality={100}
        />
      );
    case 2:
      return (
        <Image
          src={img3}
          alt="Аксессуары"
          layout="fill"
          placeholder="blur"
          quality={100}
        />
      );
    case 3:
      return (
        <Image
          src={img4}
          alt="Гардеробные классические"
          layout="fill"
          placeholder="blur"
          quality={100}
        />
      );
    case 4:
      return (
        <Image
          src={img5}
          alt="Гардеробные современные"
          layout="fill"
          placeholder="blur"
          quality={100}
        />
      );
    case 5:
      return (
        <Image
          src={img6}
          alt="Системы подсветки"
          layout="fill"
          placeholder="blur"
          quality={100}
        />
      );
    default:
      return null;
  }
};
