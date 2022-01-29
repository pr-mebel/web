import {
    Accordion as MuiAccordion,
    AccordionDetails,
    AccordionSummary,
    Container,
    Grid,
    Typography,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useRequest } from 'ahooks';
import React, { FC, useCallback, useState } from 'react';

import { fetchFAQ } from '@/api';
import { BlockTitle, ButtonContainer, MainButton } from '@/components';

const Accordion = withStyles({
    root: {
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
    },
    expanded: {},
})(MuiAccordion);

const useStyles = makeStyles((theme) => ({
    listContainer: {
        marginTop: '30px',
    },
    summaryContainer: {
        alignItems: 'center',
        margin: '0',
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
            <Grid container spacing={3} direction="column" alignItems="center" className={classes.listContainer}>
                {request.data.map((item, i) => {
                    if (i > 4 && !isShowMoreClicked) return null;

                    return (
                        <Grid item xs={12} md={8} key={item.id}>
                            <Accordion square onChange={handleChange(i)} expanded={i === expandedItemID}>
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
                <div className={classes.buttonContainer}>
                    <ButtonContainer>
                        <MainButton onClick={handleShowMore}>Показать еще</MainButton>
                    </ButtonContainer>
                </div>
            )}
        </Container>
    );
};
