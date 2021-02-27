import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import { BlockTitle, Link } from 'components/common';
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

export const Filters = ({ filter, options, onChange }) => {
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
                    options={options.sections}
                    value={filter.section}
                    onChange={onChange}
                />
            </section>
            <section className={classes.secondTitle}>
                <BlockTitle>
                    <Typography variant="h4">
                        {options.sections.reduce(
                            (res, curr) => (curr.id === filter.section ? curr.title : res),
                            options.sections[0].title,
                        )}
                    </Typography>
                </BlockTitle>
            </section>
            <section className={classes.bottomFiltersSection}>
                <BottomFilters filter={filter} options={options} onChange={onChange} />
            </section>
        </Container>
    );
};

Filters.propTypes = {
    options: PropTypes.shape({
        sections: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string.isRequired,
                id: PropTypes.string.isRequired,
            }),
        ),
        styles: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string.isRequired,
                id: PropTypes.string.isRequired,
            }),
        ),
        doorTypes: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string.isRequired,
                id: PropTypes.string.isRequired,
            }),
        ),
    }).isRequired,
    filter: PropTypes.shape({
        section: PropTypes.string.isRequired,
        style: PropTypes.string.isRequired,
        doorType: PropTypes.string.isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
};
