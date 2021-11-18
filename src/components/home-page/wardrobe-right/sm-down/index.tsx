import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid } from '@material-ui/core';
import { BlockTitle, MainButton, Pagination } from '@/components/common';
import cn from 'classnames';
import Image from 'next/image';
import { ADDITIONAL } from '../constants';
import { WardrobeAdditionalBlock } from '../../wardrobe-additional-block';

import defaultImage from 'public/images/home-page/wardrobe-right/wardrobe-1.jpg';

const useStyles = makeStyles(() => ({
    contentSm: {
        marginTop: '40px',
    },
    imgContainer: {
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
    textBottom: {
        marginTop: '30px',
        minHeight: '120px',
    },
    buttonContainer: {
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
            <Grid
                container
                justifyContent="center"
                className={classes.contentSm}
            >
                <Grid item xs={12} className={classes.imgContainer}>
                    <Image
                        src={defaultImage}
                        layout="fill"
                        alt="Шкаф исключительного качества"
                        placeholder="blur"
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
                    <Grid item xs={10} className={classes.textBottom}>
                        <WardrobeAdditionalBlock
                            title={ADDITIONAL[activePage - 1].data.title}
                            text={ADDITIONAL[activePage - 1].data.text}
                        />
                    </Grid>
                ) : (
                    <Grid item xs={10} className={classes.textBottom}>
                        <Typography variant="body2">
                            Каждое наше изделие это сложный инженерный продукт,
                            включающий в&nbsp;себя передовые мировые стандарты
                            производства мебели. Все это сделано для того, чтобы
                            наша мебель безупречно служила вам долгие годы
                        </Typography>
                    </Grid>
                )}
            </Grid>
            <Grid
                container
                justifyContent="center"
                className={classes.buttonContainer}
            >
                <Grid item xs={10} sm={6} md={4}>
                    <MainButton>Рассчитать стоимость</MainButton>
                </Grid>
            </Grid>
        </Container>
    );
};
