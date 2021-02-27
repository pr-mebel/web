import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';

const useStyles = makeStyles({
    root: {
        width: '100%',
        paddingTop: '30%',
        position: 'relative',
    },
});

export const ShopImg = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Image
                src="/images/common/shop-img/1.png"
                quality={100}
                layout="fill"
                aly="Изображение салона"
            />
        </div>
    );
};
