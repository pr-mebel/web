import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { filters } from '@/constants';
import cn from 'classnames';
import Image from 'next/image';

import cupboard from 'public/images/catalog/lead/cupboard.jpg';
import wardrobe from 'public/images/catalog/lead/wardrobe.jpg';
import accessories from 'public/images/catalog/lead/accessories.jpg';

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

const useStyles = makeStyles((theme) => ({
    root: {
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
        [theme.breakpoints.down('md')]: {
            marginTop: '50px',
        },
    },
    image: {
        opacity: '0',
        transition: 'opacity .3s ease-in-out',
    },
    selectedImage: {
        opacity: '1',
    },
}));

type Props = {
    sectionID: typeof filters.sections[number]['id'];
};

export const Lead: FC<Props> = ({ sectionID }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Image
                src={cupboard}
                alt="Шкафы"
                className={cn(classes.image, {
                    [classes.selectedImage]: sectionID === 'cupboard',
                })}
                layout="fill"
                placeholder="blur"
                objectFit="cover"
            />
            <Image
                src={wardrobe}
                alt="Гардеробные"
                className={cn(classes.image, {
                    [classes.selectedImage]: sectionID === 'wardrobe',
                })}
                layout="fill"
                placeholder="blur"
                objectFit="cover"
            />
            <Image
                src={accessories}
                alt="Аксессуары"
                className={cn(classes.image, {
                    [classes.selectedImage]: sectionID === 'accessories',
                })}
                layout="fill"
                placeholder="blur"
                objectFit="cover"
            />
            <Image
                src={accessories}
                alt="Cистемы подсветки"
                className={cn(classes.image, {
                    [classes.selectedImage]: sectionID === 'lightingSystems',
                })}
                layout="fill"
                placeholder="blur"
                objectFit="cover"
            />
        </div>
    );
};
