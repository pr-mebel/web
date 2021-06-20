import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';

import img from 'public/images/common/shop-img/1.png';

const useStyles = makeStyles({
    root: {
        width: '100%',
        paddingTop: '30%',
        position: 'relative',
    },
});

export const ShopImg: FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Image
                src={img}
                layout="fill"
                alt="Изображение салона"
                placeholder='blur'
            />
        </div>
    );
};
