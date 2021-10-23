import React, { FC } from 'react';
import { find } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import { filters as filterOptions } from '@/constants';
import { SectionID, StyleID, DoorTypeID, FilterField, FilterValue } from '@/entities';
import { BlockTitle, Link } from '@/components/common';
import { LeadText, SectionPicker, BottomFilters } from './components';

const useStyles = makeStyles((theme) => ({
    breadcrumbs: {
        textTransform: 'uppercase',
        fontSize: '13px',
    },
    homepageLink: {
        color: theme.palette.grey[500],
    },
    leadTextSection: {
        marginTop: '50px',
    },
    sectionPickerSection: {
        marginTop: '40px',
    },
    secondTitle: {
        marginTop: '40px',
    },
    bottomFiltersSection: {
        marginTop: '20px',
    },
    [theme.breakpoints.down('sm')]: {
        leadTextSection: {
            marginTop: '30px',
        },
        sectionPickerSection: {
            marginTop: '20px',
        },
    },
    [theme.breakpoints.down('xs')]: {
        secondTitle: {
            marginTop: '20px',
        },
    },
}));

type Props = {
    filter: {
        section: SectionID;
        style: StyleID;
        doorType: DoorTypeID;
    };
    onChange: (arg0: { name: FilterField; value: FilterValue }) => void;
};


export const Filters: FC<Props> = ({ filter, onChange }) => {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Typography className={classes.breadcrumbs}>
                <Link to="/" className={classes.homepageLink}>
                    Главная
                </Link>
                <span> - каталог</span>
            </Typography>
            <BlockTitle>
                <Typography variant="h4">Каталог</Typography>
            </BlockTitle>
            <section className={classes.leadTextSection}>
                <LeadText selectedSection={filter.section} />
            </section>
            <section className={classes.sectionPickerSection}>
                <SectionPicker
                    options={filterOptions.sections}
                    value={filter.section}
                    onChange={onChange}
                />
            </section>
            <section className={classes.secondTitle}>
                <BlockTitle>
                    <Typography variant="h4">
                        {find(filterOptions.sections, { id: filter.section })?.title}
                    </Typography>
                </BlockTitle>
            </section>
            <section className={classes.bottomFiltersSection}>
                <BottomFilters filter={filter} onChange={onChange} />
            </section>
        </Container>
    );
};
