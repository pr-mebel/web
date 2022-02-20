import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Accordion, AccordionDetails, AccordionSummary, Container, Grid, Typography } from '@mui/material';
import { useRequest } from 'ahooks';
import React, { FC, useCallback, useState } from 'react';

import { fetchFAQ } from '@/api';
import { BlockTitle, Button, ButtonContainer } from '@/components';

export const Faq: FC = () => {
    const [isShowMoreClicked, setIsShowMoreClicked] = useState(false);
    const [expandedItemID, setExpandedItemID] = useState<number | null>(null);

    const request = useRequest(async () => {
        const resp = await fetchFAQ();

        return resp.data.map((card, i) => ({
            ...card,
            id: i + 1 >= 10 ? `${i + 1}` : `0${i + 1}`,
        }));
    });

    /**
     * Обработчик клика на кнопку показать еще
     */
    const handleShowMore = useCallback(() => {
        setIsShowMoreClicked(true);
    }, []);

    /**
     * Обработчик клика на конкретный вопрос.
     * Открывает тот, на который кликнули, и закрывает остальные
     */
    const handleChange = useCallback(
        (i: number) => (_: unknown, expanded: boolean) => {
            if (expanded) {
                setExpandedItemID(i);
            } else {
                setExpandedItemID(null);
            }
        },
        []
    );

    if (request.loading || !request.data) {
        return null;
    }

    return (
        <Container>
            <BlockTitle>
                <Typography variant="h4">Часто задаваемые вопросы</Typography>
            </BlockTitle>
            <Grid
                container
                spacing={3}
                justifyContent="center"
                sx={(theme) => ({
                    marginTop: '30px',
                    '& .dropdownIcon': {
                        color: theme.palette.primary.main,
                        transform: 'rotate(90deg)',
                    },
                    '& .number': {
                        fontSize: '40px',
                        color: theme.palette.primary.main,
                        marginRight: '20px',
                    },
                    '& .summaryContainer': {
                        alignItems: 'center',
                        margin: '0',
                    },
                })}
            >
                {request.data.map((item, i) => {
                    if (i > 4 && !isShowMoreClicked) return null;

                    return (
                        <Grid item xs={12} sm={8} key={item.id}>
                            <Accordion
                                square
                                onChange={handleChange(i)}
                                expanded={i === expandedItemID}
                                sx={{
                                    border: '1px solid rgba(235,47,70,.2)',
                                    boxShadow: 'none',
                                    '&:not(:last-child)': {
                                        borderBottom: 0,
                                    },
                                    '&:before': {
                                        display: 'none',
                                    },
                                    '&$expanded': {
                                        margin: 'auto',
                                    },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ArrowForwardIosIcon className="dropdownIcon" />}
                                    classes={{
                                        content: 'summaryContainer',
                                    }}
                                >
                                    <Typography className="number">{item.id}</Typography>
                                    <Typography variant="body2">{item.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="body2">{item.text}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    );
                })}
            </Grid>
            {!isShowMoreClicked && (
                <ButtonContainer
                    sx={{
                        marginTop: '30px',
                    }}
                >
                    <Button block onClick={handleShowMore}>
                        Показать еще
                    </Button>
                </ButtonContainer>
            )}
        </Container>
    );
};
