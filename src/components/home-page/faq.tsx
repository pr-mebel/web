import { Accordion, AccordionDetails, AccordionSummary, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useRequest } from 'ahooks';
import React, { FC, useCallback, useState } from 'react';

import { fetchFAQ } from '@/api';
import { BlockTitle, MainButton } from '@/components/common';

const useStyles = makeStyles((theme) => ({
    listContainer: {
        marginTop: '30px',
    },
    summaryContainer: {
        alignItems: 'center',
    },
    number: {
        fontSize: '40px',
        color: theme.palette.primary.main,
        marginRight: '20px',
    },
    dropdownIcon: {
        color: theme.palette.primary.main,
        transform: 'rotate(90deg)',
    },
    buttonContainer: {
        marginTop: '30px',
    },
}));

export const FAQ: FC = () => {
    const classes = useStyles();
    const [isShowMoreClicked, setIsShowMoreClicked] = useState(false);
    const [expandedItemID, setExpandedItemID] = useState<number | null>(null);

    const request = useRequest(fetchFAQ, {
        formatResult: (resp) =>
            resp.data.map((card, i) => ({
                ...card,
                id: i + 1 >= 10 ? `${i + 1}` : `0${i + 1}`,
            })),
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
            <Grid container spacing={3} direction="column" alignItems="center" className={classes.listContainer}>
                {request.data.map((item, i) => {
                    if (i > 4 && !isShowMoreClicked) return null;

                    return (
                        <Grid item xs={12} md={10} key={item.id}>
                            <Accordion onChange={handleChange(i)} expanded={i === expandedItemID}>
                                <AccordionSummary
                                    expandIcon={<ArrowForwardIosIcon className={classes.dropdownIcon} />}
                                    classes={{
                                        content: classes.summaryContainer,
                                    }}
                                >
                                    <Typography className={classes.number}>{item.id}</Typography>
                                    <Typography>{item.title}</Typography>
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
                <Grid container justifyContent="center" className={classes.buttonContainer}>
                    <Grid item xs={10} sm={6} md={4}>
                        <MainButton onClick={handleShowMore}>Показать еще</MainButton>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};
