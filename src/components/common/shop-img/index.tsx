import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ImageProgressive } from '@/components';

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
            <ImageProgressive src="/images/common/shop-img/1.png" alt="Изображение салона" />
        </div>
    );
};
