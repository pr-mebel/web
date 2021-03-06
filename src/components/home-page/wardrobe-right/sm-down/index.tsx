import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid } from '@material-ui/core';
import { BlockTitle, MainButton, Pagination } from '@/components/common';
import cn from 'classnames';
import Image from 'next/image';
import { ADDITIONAL, defaultImage } from '../constants';
import { WardrobeAdditionalBlock } from '../../wardrobe-additional-block';

const useStyles = makeStyles(() => ({
    content_sm: {
        marginTop: '40px',
    },
    img__container: {
        position: 'relative',
        paddingTop: '71.9%',
    },
    image: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        opacity: '0',
        transition: 'opacity .3s ease-in-out',
    },
    selectedImage: {
        opacity: '1',
    },
    text_bottom: {
        marginTop: '30px',
        minHeight: '120px',
    },
    'button-container': {
        marginTop: '32px',
    },
}));

export const WardrobeRightSmDown = () => {
    const classes = useStyles();
    const [activePage, setActivePage] = useState(0);

    return (
        <Container>
            <BlockTitle>
                <Typography variant="h4">
                    Исключительное качество
                    <br />
                    нашей мебели
                </Typography>
            </BlockTitle>
            <Grid container justify="center" className={classes.content_sm}>
                <Grid item xs={12} className={classes.img__container}>
                    <Image
                        src={defaultImage}
                        layout="fill"
                        alt="Шкаф исключительного качества"
                        className={cn(classes.image, {
                            [classes.selectedImage]: activePage === 0,
                        })}
                        quality={100}
                    />
                    {ADDITIONAL.map(({ data: { img, title }, id }, i) => (
                        <Image
                            key={id}
                            src={img}
                            alt={title}
                            className={cn(classes.image, {
                                [classes.selectedImage]: activePage - 1 === i,
                            })}
                            layout="fill"
                            objectFit="contain"
                            quality={100}
                        />
                    ))}
                </Grid>
                <Grid item xs={12}>
                    <Pagination
                        numberOfPages={ADDITIONAL.length}
                        activeIndex={activePage}
                        onChange={setActivePage}
                    />
                </Grid>
                {activePage !== 0 ? (
                    <Grid item xs={10} className={classes.text_bottom}>
                        <WardrobeAdditionalBlock
                            title={ADDITIONAL[activePage - 1].data.title}
                            text={ADDITIONAL[activePage - 1].data.text}
                        />
                    </Grid>
                ) : (
                    <Grid item xs={10} className={classes.text_bottom}>
                        <Typography variant="body2">
                            Каждое наше изделие это сложный инженерный продукт, включающий
                            в&nbsp;себя передовые мировые стандарты производства мебели. Все это
                            сделано для того, чтобы наша мебель безупречно служила вам долгие годы
                        </Typography>
                    </Grid>
                )}
            </Grid>
            <Grid container justify="center" className={classes['button-container']}>
                <Grid item xs={10} sm={6} md={4}>
                    <MainButton>Рассчитать стоимость</MainButton>
                </Grid>
            </Grid>
        </Container>
    );
};
