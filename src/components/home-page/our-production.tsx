import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import img from 'public/images/home-page/our-production/1.jpg';
import React, { FC } from 'react';

import { BlockTitle, ButtonContainer, MainButton } from '@/components';
import { NB_SP } from '@/constants';
import { addIdsToArrayOfObjects } from '@/utils';

const LIST = addIdsToArrayOfObjects([
    {
        title: 'Квалифицированный\nперсонал',
        text: `Все сотрудники нашей фабрики имеют многолетний опыт работы
        и${NB_SP}проходят ежегодную аттестацию.`,
    },
    {
        title: 'Инженерное\n3D-проектирование',
        text: `Каждый проект проходит стадию инженерного 3D-проектирования,
        что обеспечивает максимально качественную реализацию проекта.`,
    },
    {
        title: 'Промышленное\nоборудование',
        text: `Наша фабрика оснащена европейским промышленным оборудованием
        с${NB_SP}числовым программным управлением.
        Максимум автоматизации, минимум ручного труда.`,
    },
    {
        title: 'Контроль качества\nна всех участках',
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
        whiteSpace: 'pre-line',
        [theme.breakpoints.down('xs')]: {
            whiteSpace: 'initial',
        },
    },
    listWrapper: {
        display: 'grid',
        rowGap: '18px',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr 1fr',
        },
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '1fr',
        },
    },
    text: {
        marginTop: '24px',
        fontSize: '15px',
        [theme.breakpoints.down('xs')]: {
            marginTop: '4px',
        },
    },
    contentSm: {
        minHeight: '114px',
    },
    buttonContainer: {
        marginTop: '10px',
    },
    bottomTitle: {
        marginTop: '30px',
    },
}));

export const OurProduction: FC = () => {
    const classes = useStyles();

    return (
        <Container>
            <BlockTitle>
                <Typography variant="h4">Наше производство</Typography>
            </BlockTitle>
            <div className={classes.imgContainer}>
                <Image src={img} alt="Производство" layout="fill" placeholder="blur" />
            </div>
            <div className={classes.listWrapper}>
                {LIST.map((item) => (
                    <div key={item.id}>
                        <BlockTitle>
                            <Typography variant="h6" className={classes.sectionTitle}>
                                {item.data.title}
                            </Typography>
                        </BlockTitle>
                        <Typography className={classes.text} variant="body2">
                            {item.data.text}
                        </Typography>
                    </div>
                ))}
            </div>
            <Grid item xs={12} container justifyContent="center">
                <Grid item xs={12} md={10}>
                    <Typography variant="h5" className={classes.bottomTitle} align="center">
                        Современные технологии производства для идеального качества вашей мебели
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.buttonContainer}>
                <ButtonContainer>
                    <MainButton>Получить проект</MainButton>
                </ButtonContainer>
            </Grid>
        </Container>
    );
};
