import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Typography,
    Grid,
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { NB_SP, MDASH } from '@/constants';
import { BlockTitle, MainButton } from '@/components/common';

const LIST = [
    {
        id: '01',
        title: 'Сколько лет ваша компания существует на рынке?',
        text: `Наш салон расположен на${NB_SP}одном и${NB_SP}том${NB_SP}же
    месте и${NB_SP}успешно работает уже более 20${NB_SP}лет.
    Приходите, мы${NB_SP}будем рады вас видеть и${NB_SP}поделимся
    с${NB_SP}вами всем нашим опытом!`,
    },
    {
        id: '02',
        title: 'Какую продукцию кроме шкафов я могу у вас заказать?',
        text: `Мы${NB_SP}изготавливаем любую корпусную мебель
    по${NB_SP}индивидуальным проектам${NB_SP}${MDASH} прихожие,
    кабинеты, гостиные, гардеробные, библиотеки и${NB_SP}даже кухни.
    Вы${NB_SP}можете заказать изделия как в${NB_SP}современном,
    так и${NB_SP}в${NB_SP}классическом стиле, основываясь
    на${NB_SP}разработанных нами моделях,
    либо реализовать ваши собственные дизайнерские идеи.`,
    },
    {
        id: '03',
        title:
            'Могу ли я заказать шкаф под дизайн межкомнатных дверей или другой имеющейся мебели?',
        text: `Да, наши специалисты могут разработать дизайн изделия
    как под ваши межкомнатные двери, так и${NB_SP}под любые
    другие предметы интерьера. Мы${NB_SP}максимально точно
    повторим как само дизайнерское решение, так и${NB_SP}отделку.`,
    },
    {
        id: '04',
        title: 'Насколько безопасны применяемые материалы?',
        text: `Все используемые нами материалы имеют соответствующие
    сертификаты качества и${NB_SP}абсолютно безопасны. Например,
    применяемые нами ламинированные панели из${NB_SP}ДСП имеют
    экологическую чистоту класса${NB_SP}Е1, что позволяет их${NB_SP}применять
    в${NB_SP}детских комнатах и${NB_SP}больницах, а${NB_SP}используемые
    в${NB_SP}фасадах стекла всегда имеют специальную защитную пленку.`,
    },
    {
        id: '05',
        title: 'Каковы сроки изготовления вашей мебели?',
        text: `Сроки изготовления мебели напрямую зависят от${NB_SP}выбранной
    модели изделия и${NB_SP}составляет от${NB_SP}20${NB_SP}до${NB_SP}60${NB_SP}
    дней. Например, сроки изготовления гардеробной комнаты из${NB_SP}
    ЛДСП значительно ниже, чем у${NB_SP}классического шкафа купе с${NB_SP}
    фасадами, покрытыми эмалью. Это связано с${NB_SP}особенностями
    производственного процесса изготовления изделий, в${NB_SP}случае
    с${NB_SP}эмалью он${NB_SP}значительно более сложный и${NB_SP}длительный.`,
    },
    {
        id: '06',
        title: 'Почему срок изготовления дольше, чем у многих интернет-магазинов?',
        text: `Срок изготовления премиальной высококачественной мебели на${NB_SP}
    заказ складывается из${NB_SP}множества факторов, выстроенных и${NB_SP}
    оптимизированных за${NB_SP}долгие годы работы. Чтобы в${NB_SP}
    итоге получился качественный результат, изделие проходит множество
    производственных стадий, начиная с${NB_SP}детальной инженерной
    проработки дизайн проекта заканчивая несколькими этапами
    контроля качества, которые требуют времени.`,
    },
    {
        id: '07',
        title: 'Сколько стоит ваша продукция?',
        text: `Итоговая стоимость изделия складывается из${NB_SP}множества факторов.
    Для ответа на${NB_SP}этот вопрос нам необходимо знать габариты изделия,
    определить его конструктивные особенности, встроенное${NB_SP}ли это будет
    изделие или корпусное, и${NB_SP}разумеется выбрать подходящие именно вам
    материалы, комплектующие и${NB_SP}дополнительные аксессуары. Каждое
    изделие изготавливается по${NB_SP}индивидуальному дизайн-проекту,
    стоимость которого определяется на${NB_SP}основании сделанного вами выбора.
    Стоимость${NB_SP}1.м.п. изделия может варьироваться
    от${NB_SP}30${NB_SP}до${NB_SP}150${NB_SP}тыс. рублей.`,
    },
    {
        id: '08',
        title: 'Почему ваша продукция стоит дороже, чем у некоторых других компаний?',
        text: `Итоговая стоимость изготовления мебели на${NB_SP}заказ напрямую
    зависит от${NB_SP}качества используемых материалов и${NB_SP}комплектующих,
    применяемых технологий и${NB_SP}производственных процессов компании.
    Наша компания ориентирована на${NB_SP}изготовление мебели, которая
    будет безупречно служить и${NB_SP}радовать вас долгие годы, поэтому
    мы${NB_SP}никогда не${NB_SP}применяем решений, которые способны снизить
    стоимость, но${NB_SP}могут ухудшить качество вашего изделия.`,
    },
    {
        id: '09',
        title: 'Нужно ли оплачивать всю сумму заказа сразу?',
        text: `Для запуска изделия в${NB_SP}производство необходимо заключить
    договор и${NB_SP}внести предоплату${NB_SP}50% от${NB_SP}суммы
    договора. После выполнения заказа вносится остаток суммы.`,
    },
    {
        id: '10',
        title: 'Можно ли приобрести вашу мебель в кредит или рассрочку?',
        text: `Да, мы${NB_SP}сотрудничаем с${NB_SP}банками, предоставляющие
    кредит или рассрочку. Подробную информацию нужно
    уточнять у${NB_SP}нашего менеджера.`,
    },
];

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

export const FAQ = () => {
    const classes = useStyles();
    const [isShowMoreClicked, setIsShowMoreClicked] = useState(false);
    const [expandedList, setExpandedList] = useState(
        LIST.reduce(
            (acc, v) => ({
                ...acc,
                [v.title]: false,
            }),
            {},
        ),
    );

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
        (title) => (_: unknown, expanded: boolean) => {
            if (expanded) {
                setExpandedList(
                    LIST.reduce(
                        (acc, v) => ({
                            ...acc,
                            [v.title]: v.title === title,
                        }),
                        {},
                    ),
                );
            } else {
                setExpandedList(
                    LIST.reduce(
                        (acc, v) => ({
                            ...acc,
                            [v.title]: false,
                        }),
                        {},
                    ),
                );
            }
        },
        [],
    );

    return (
        <Container>
            <BlockTitle>
                <Typography variant="h4">Часто задаваемые вопросы</Typography>
            </BlockTitle>
            <Grid
                container
                spacing={3}
                direction="column"
                alignItems="center"
                className={classes.listContainer}
            >
                {LIST.map((item, i) => {
                    if (i > 4 && !isShowMoreClicked) return null;

                    return (
                        <Grid item xs={12} md={10} key={item.id}>
                            <Accordion
                                onChange={handleChange(item.title)}
                                expanded={expandedList[item.title as keyof typeof expandedList]}
                            >
                                <AccordionSummary
                                    expandIcon={
                                        <ArrowForwardIosIcon className={classes.dropdownIcon} />
                                    }
                                    classes={{
                                        content: classes.summaryContainer,
                                    }}
                                >
                                    <Typography className={classes.number}>{item.id}</Typography>
                                    <Typography>{item.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>{item.text}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    );
                })}
            </Grid>
            {!isShowMoreClicked && (
                <Grid container justify="center" className={classes.buttonContainer}>
                    <Grid item xs={10} sm={6} md={4}>
                        <MainButton onClick={handleShowMore}>Показать еще</MainButton>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};
