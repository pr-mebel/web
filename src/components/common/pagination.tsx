import { Box, styled, SvgIcon as MUISvgIcon } from '@mui/material';
import { range } from 'lodash';
import React, { FC, useCallback } from 'react';

const SvgIcon = styled(MUISvgIcon)(({ theme }) => ({
    color: theme.palette.primary.main,
    height: '20px',
    position: 'absolute',
    top: '0',
}));

type Props = {
    numberOfPages: number;
    activeIndex: number;
    onChange: (arg0: number) => void;
};

export const Pagination: FC<Props> = ({ numberOfPages, activeIndex, onChange }) => {
    /**
     * Обработчик клика стрелочки назад
     */
    const handleClickPrev = useCallback(() => {
        if (activeIndex === 0) {
            onChange(numberOfPages - 1);
        } else {
            onChange(activeIndex - 1);
        }
    }, [activeIndex, numberOfPages, onChange]);

    /**
     * Обработчик клика стрелочки вперед
     */
    const handleClickNext = useCallback(() => {
        if (activeIndex === numberOfPages - 1) {
            onChange(0);
        } else {
            onChange(activeIndex + 1);
        }
    }, [activeIndex, numberOfPages, onChange]);

    /**
     * Обработчик клика на номер страницы
     */
    const handleClickByIndex = useCallback(
        (i) => () => {
            if (activeIndex !== i) {
                onChange(i);
            }
        },
        [activeIndex, onChange]
    );

    return (
        <Box
            sx={{
                marginTop: '20px',
                position: 'relative',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <SvgIcon
                sx={{
                    left: '10px',
                }}
                viewBox="0 0 14 24"
                onClick={handleClickPrev}
            >
                <path
                    d="M11.857 23.448a.807.807 0 0 0 .585.242.827.827 0 0 0 .585-1.41L2.746 12l10.28-10.28a.827.827 0 0 0-1.17-1.168L.994 11.416a.827.827 0 0 0 0 1.168l10.863 10.864z"
                    fill="#EB2F46"
                />
            </SvgIcon>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '70%',
                    margin: 'auto',
                }}
            >
                {range(numberOfPages).map((index) => (
                    <Box
                        sx={(theme) => ({
                            width: '10px',
                            height: '10px',
                            content: '""',
                            border: `1px solid ${theme.palette.primary.main}`,
                            borderRadius: '50%',
                            margin: '0 5px',
                            background: index === activeIndex ? theme.palette.primary.main : 'none',
                        })}
                        key={index}
                        onClick={handleClickByIndex(index)}
                    />
                ))}
            </Box>
            <SvgIcon
                sx={{
                    right: '10px',
                }}
                viewBox="0 0 14 24"
                onClick={handleClickNext}
            >
                <path
                    d="M2.143 23.448a.807.807 0 0 1-.585.242.827.827 0 0 1-.584-1.41L11.253 12 .973 1.72A.827.827 0 0 1 2.144.553l10.863 10.864a.827.827 0 0 1 0 1.168L2.143 23.449z"
                    fill="#EB2F46"
                />
            </SvgIcon>
        </Box>
    );
};
