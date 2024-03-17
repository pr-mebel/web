import CheckIcon from '@mui/icons-material/Check';
import { Box, SvgIcon, Typography } from '@mui/material';
import clsx from 'clsx';
import Image from 'next/legacy/image';

import { useYaCounter54949111 } from '@/analytics';
import { BlockTitle } from '@/components';
import { usePagination } from '@/hooks';

import { Options } from '../components';
import { TABS } from '../texts';

export const Mobile = () => {
    const analytics = useYaCounter54949111();
    const { current, onNext, onPrev, swipableHandlers } = usePagination({
        total: TABS.length - 1,
        onBeforeNext: () => analytics.track('comfort-section/anything/click'),
        onBeforePrev: () => analytics.track('comfort-section/anything/click'),
    });

    return (
        <Box
            sx={{
                marginTop: '40px',
            }}
            {...swipableHandlers}
        >
            <BlockTitle>
                <Typography variant="h5">
                    Мы используем только премиальные материалы для нашей мебели
                </Typography>
            </BlockTitle>
            <Box
                sx={{
                    position: 'relative',
                    marginRight: '7%',
                    marginLeft: '7%',
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
                <Box
                    sx={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        background: 'rgba(0,0,0,.5)',
                        width: '100%',
                        height: '40px',
                        zIndex: 10,
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="span" variant="h5">
                        {TABS[current].data.title}
                    </Typography>
                </Box>
                <SvgIcon
                    sx={{
                        height: '20px',
                        position: 'absolute',
                        top: '50%',
                        cursor: 'pointer',
                        left: '-30px',
                    }}
                    viewBox="0 0 14 24"
                    onClick={onPrev}
                >
                    <path
                        d="M11.857 23.448a.807.807 0 0 0 .585.242.827.827 0 0 0 .585-1.41L2.746 12l10.28-10.28a.827.827 0 0 0-1.17-1.168L.994 11.416a.827.827 0 0 0 0 1.168l10.863 10.864z"
                        fill="#EB2F46"
                    />
                </SvgIcon>
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
                <SvgIcon
                    sx={{
                        height: '20px',
                        position: 'absolute',
                        top: '50%',
                        cursor: 'pointer',
                        right: '-30px',
                    }}
                    viewBox="0 0 14 24"
                    onClick={onNext}
                >
                    <path
                        d="M2.143 23.448a.807.807 0 0 1-.585.242.827.827 0 0 1-.584-1.41L11.253 12 .973 1.72A.827.827 0 0 1 2.144.553l10.863 10.864a.827.827 0 0 1 0 1.168L2.143 23.449z"
                        fill="#EB2F46"
                    />
                </SvgIcon>
            </Box>
            <Box
                sx={(theme) => ({
                    minHeight: '175px',
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
            </Box>
        </Box>
    );
};
