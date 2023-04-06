import CheckIcon from '@mui/icons-material/Check';
import { Box, Grid, Typography } from '@mui/material';
import clsx from 'clsx';
import Image from 'next/legacy/image';

import { BlockTitle } from '@/components';
import { usePagination } from '@/hooks';

import { Options, Tabs } from '../components';
import { TABS } from '../texts';

export const Desktop = () => {
    const { current, onSet } = usePagination({
        total: TABS.length - 1,
    });

    return (
        <>
            <BlockTitle>
                <Typography variant="h4">Преимущества нашей продукции</Typography>
            </BlockTitle>
            <Grid
                container
                sx={{
                    marginTop: '30px',
                }}
            >
                <Grid item xs={12} md={10}>
                    <Typography variant="body2">
                        Мы&nbsp;постоянно улучшаем качество, эргономические и&nbsp;эстетические параметры нашей мебели.
                        Начиная с&nbsp;подбора материалов и&nbsp;комплектующих мы&nbsp;создаем эксклюзивный проект
                        будущего изделия, который не&nbsp;просто идеально впишется в&nbsp;ваш интерьер, а&nbsp;будет
                        комфортен, удобен и&nbsp;функционален в&nbsp;использовании, и&nbsp;прослужит Вам долгие годы.
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                item
                xs={12}
                container
                sx={{
                    marginTop: '40px',
                }}
                spacing={2}
            >
                <Grid item xs={12} sm={7} container direction="column">
                    <Grid item>
                        <BlockTitle>
                            <Typography variant="h5">
                                Мы используем только премиальные материалы для нашей мебели
                            </Typography>
                        </BlockTitle>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={7}
                    sx={(theme) => ({
                        marginTop: '20px',
                        '& .list': {
                            margin: '0',
                            marginTop: '20px',
                            paddingLeft: '30px',
                            listStyle: 'none',
                        },
                        '& .listItem': {
                            position: 'relative',
                            marginBottom: '4px',
                        },
                        '& .check': {
                            width: '20px',
                            position: 'absolute',
                            left: '-30px',
                            top: '-3px',
                            color: theme.palette.primary.main,
                        },
                        '& .listText': {
                            fontSize: '16px',
                            lineHeight: '1.2',
                        },
                    })}
                >
                    <Tabs tabs={TABS} activeTab={current} onChange={onSet} />
                    <Options activeTab={current}>
                        {TABS.map((tab) => (
                            <ul key={tab.id} className="list">
                                {tab.data.list.map((option) => (
                                    <li key={option} className="listItem">
                                        <CheckIcon className="check" />
                                        <Typography className="listText">{option}</Typography>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </Options>
                </Grid>
                <Grid item xs={5}>
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            margin: 'auto',
                            paddingTop: '66%',
                            '& .image': {
                                width: '100%',
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                opacity: '0',
                                transition: 'opacity .3s ease-in-out',
                            },
                            '& .selectedImage': {
                                opacity: '1',
                            },
                        }}
                    >
                        {TABS.map((tab, i) => (
                            <Image
                                key={tab.id}
                                src={tab.data.img}
                                alt={tab.data.title}
                                layout="fill"
                                className={clsx('image', {
                                    selectedImage: current === i,
                                })}
                                placeholder="blur"
                            />
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};
