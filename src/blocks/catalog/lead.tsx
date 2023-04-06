import { Box } from '@mui/material';
import clsx from 'clsx';
import Image from 'next/legacy/image';
import accessories from 'public/images/catalog/lead/accessories.jpg';
import cupboard from 'public/images/catalog/lead/cupboard.jpg';
import wardrobe from 'public/images/catalog/lead/wardrobe.jpg';
import React, { FC } from 'react';

import { filters } from '@/constants';
import { addIdsToArrayOfObjects } from '@/utils';

export const images = addIdsToArrayOfObjects([
    {
        sectionId: filters.sections[0].id,
    },
    {
        sectionId: filters.sections[1].id,
    },
    {
        sectionId: filters.sections[2].id,
    },
    {
        sectionId: filters.sections[3].id,
    },
]);

type Props = {
    sectionID: typeof filters.sections[number]['id'];
};

export const Lead: FC<Props> = ({ sectionID }) => (
    <Box
        sx={(theme) => ({
            marginTop: '70px',
            width: '100%',
            paddingTop: '35%',
            maxHeight: '500px',
            position: 'relative',
            '&:after': {
                position: 'absolute',
                content: '""',
                width: '100%',
                height: '100%',
                top: '0',
                left: '0',
                background: 'rgba(0, 0, 0, .3)',
            },
            [theme.breakpoints.down('lg')]: {
                marginTop: '50px',
            },
            '& .image': {
                opacity: '0',
                transition: 'opacity .3s ease-in-out',
            },
            '& .selectedImage': {
                opacity: '1',
            },
        })}
    >
        <Image
            src={cupboard}
            alt="Шкафы"
            className={clsx('image', {
                selectedImage: sectionID === 'cupboard',
            })}
            layout="fill"
            placeholder="blur"
            objectFit="cover"
        />
        <Image
            src={wardrobe}
            alt="Гардеробные"
            className={clsx('image', {
                selectedImage: sectionID === 'wardrobe',
            })}
            layout="fill"
            placeholder="blur"
            objectFit="cover"
        />
        <Image
            src={accessories}
            alt="Аксессуары"
            className={clsx('image', {
                selectedImage: sectionID === 'accessories',
            })}
            layout="fill"
            placeholder="blur"
            objectFit="cover"
        />
        <Image
            src={accessories}
            alt="Cистемы подсветки"
            className={clsx('image', {
                selectedImage: sectionID === 'lightingSystems',
            })}
            layout="fill"
            placeholder="blur"
            objectFit="cover"
        />
    </Box>
);
