import React, { FC, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Container, Typography, Grid, Hidden } from '@material-ui/core';
import Image from 'next/image';
import { addIdsToArrayOfObjects } from '@/utils';
import { NB_SP } from '@/constants';
import { BlockTitle, MainButton, Pagination } from '@/components/common';

import img from 'public/images/home-page/our-production/1.jpg';

const LIST = addIdsToArrayOfObjects([
    {
        title: 'Квалифицированный персонал',
        text: `Все сотрудники нашей фабрики имеют многолетний опыт работы
    и${NB_SP}проходят ежегодную аттестацию.`,
    },
    {
        title: 'Инженерное 3D-проектирование',
        text: `Каждый проект проходит стадию инженерного 3D-проектирования,
    что обеспечивает максимально качественную реализацию проекта.`,
    },
    {
        title: 'Промышленное оборудование',
        text: `Наша фабрика оснащена европейским промышленным оборудованием
    с${NB_SP}числовым программным управлением.
    Максимум автоматизации, минимум ручного труда.`,
    },
    {
        title: 'Контроль качества на всех участках',
        text: `Качество нашей продукции оценивается более чем
    по${NB_SP}1000${NB_SP}параметрам, что позволяет
    свести риск возникновения брака к${NB_SP}минимуму.`,
    },
]);

const useStyles = makeStyles((theme) => ({
    imgContainer: {
        marginTop: '30px',
        width: '100%',
        marginBottom: '24px',
        position: 'relative',
        paddingTop: '30%',
    },
    sectionTitle: {
        fontSize: '16px',
        lineHeight: '18px',
        fontWeight: 400,
    },
    text: {
        marginTop: '24px',
        fontSize: '15px',
    },
    contentSm: {
        minHeight: '114px',
    },
    buttonContainer: {
        marginTop: '30px',
        [theme.breakpoints.down('xs')]: {
            marginTop: '50px',
        },
    },
    bottomTitle: {
        marginTop: '30px',
    },
}));

export const OurProduction: FC = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <Container>
            <BlockTitle>
                <Typography variant="h4">Наше производство</Typography>
            </BlockTitle>
            <div className={classes.imgContainer}>
                <Image
                    src={img}
                    alt="Производство"
                    layout="fill"
                    placeholder="blur"
                />
            </div>
            <Grid container spacing={isXsDown ? 2 : 4}>
                <Hidden xsDown>
                    {LIST.map((item) => (
                        <Grid key={item.id} item xs={6} md={3}>
                            <BlockTitle>
                                <Typography
                                    variant="h6"
                                    className={classes.sectionTitle}
                                >
                                    {item.data.title}
                                </Typography>
                            </BlockTitle>
                            <Typography
                                className={classes.text}
                                variant="body2"
                            >
                                {item.data.text}
                            </Typography>
                        </Grid>
                    ))}
                </Hidden>
                <Hidden smUp>
                    <Grid item xs={12} className={classes.contentSm}>
                        <BlockTitle>
                            <Typography variant="h5">
                                {LIST[activeIndex].data.title}
                            </Typography>
                        </BlockTitle>
                        <Typography variant="body2" className={classes.text}>
                            {LIST[activeIndex].data.text}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Pagination
                            numberOfPages={LIST.length}
                            activeIndex={activeIndex}
                            onChange={setActiveIndex}
                        />
                    </Grid>
                </Hidden>
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={10}>
                        <Typography
                            variant="h5"
                            className={classes.bottomTitle}
                            align="center"
                        >
                            Современные технологии производства для идеального
                            качества вашей мебели
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    justifyContent="center"
                    className={classes.buttonContainer}
                >
                    <Grid item xs={10} sm={6} md={4}>
                        <MainButton>Получить проект</MainButton>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};
