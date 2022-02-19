import { Grid, Typography } from '@mui/material';

import { BlockTitle } from '@/components';

export const Desktop = () => {
    return (
        <Grid
            container
            spacing={6}
            sx={(theme) => ({
                marginTop: '32px',
                '& .item': {
                    position: 'relative',
                },
                '& .sectionTitle': {
                    fontSize: '16px',
                    lineHeight: '18px',
                    fontWeight: 400,
                    whiteSpace: 'pre-line',
                },
                '& .number': {
                    position: 'absolute',
                    fontSize: '120px',
                    lineHeight: '120px',
                    color: theme.palette.primary.main,
                    opacity: '.07',
                    top: '-5px',
                    left: '20px',
                    fontWeight: 700,
                },
                '& .text': {
                    marginTop: '20px',
                },
            })}
        >
            <Grid item xs={4} className="item">
                <Typography className="number">01</Typography>
                <BlockTitle>
                    <Typography variant="h6" className="sectionTitle">
                        Оставьте заявку на сайте или закажите звонок
                    </Typography>
                </BlockTitle>
                <Typography variant="body2" className="text">
                    Наш менеджер свяжется с&nbsp;вами, ответит на&nbsp;все вопросы, и&nbsp;предложит вам наиболее
                    удобный способ работы над вашим проектом
                </Typography>
            </Grid>
            <Grid item xs={4} className="item">
                <Typography className="number">02</Typography>
                <BlockTitle>
                    <Typography variant="h6" className="sectionTitle">
                        Разработка дизайн-проекта мебели
                    </Typography>
                </BlockTitle>
                <Typography variant="body2" className="text">
                    Вы&nbsp;можете прислать ваши эскизы или просто планировки нам и&nbsp;наши специалисты разработают
                    дизайн-проект будущей мебели и&nbsp;рассчитают его стоимость
                </Typography>
            </Grid>
            <Grid item xs={4} className="item">
                <Typography className="number">03</Typography>
                <BlockTitle>
                    <Typography variant="h6" className="sectionTitle">
                        Выезд дизайнера-замерщика на дом
                    </Typography>
                </BlockTitle>
                <Typography variant="body2" className="text">
                    Наш специалист приедет в&nbsp;удобное для вас время, сделает нужные замеры и&nbsp;согласует все
                    детали будущего проекта
                </Typography>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={8} container spacing={6}>
                <Grid item xs={6} className="item">
                    <Typography className="number">04</Typography>
                    <BlockTitle>
                        <Typography variant="h6" className="sectionTitle">
                            Изготовление мебели
                        </Typography>
                    </BlockTitle>
                    <Typography variant="body2" className="text">
                        Наша мебель изготавливается на&nbsp;промышленных обрабатывающих центрах с&nbsp;числовым
                        программным управлением. Вы&nbsp;получите действительно качественную мебель европейского уровня
                    </Typography>
                </Grid>
                <Grid item xs={6} className="item">
                    <Typography className="number">05</Typography>
                    <BlockTitle>
                        <Typography variant="h6" className="sectionTitle">
                            Доставка и монтаж
                        </Typography>
                    </BlockTitle>
                    <Typography variant="body2" className="text">
                        Собственная служба сервиса доставит и&nbsp;установит вашу мебель в&nbsp;оговоренное время.
                        Мы&nbsp;сами отвечаем за&nbsp;качество проекта от&nbsp;самого начала до&nbsp;момента его
                        установки у&nbsp;вас дома
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};
