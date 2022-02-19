import { Container, Typography } from '@mui/material';
import { find } from 'lodash';
import React, { FC } from 'react';

import { BlockTitle, Link } from '@/components/common';
import { filters as filterOptions } from '@/constants';
import { DoorTypeID, FilterField, FilterValue, SectionID, StyleID } from '@/entities';

import { BottomFilters, LeadText, SectionPicker } from './components';

type Props = {
    filter: {
        section: SectionID;
        style: StyleID;
        doorType: DoorTypeID;
    };
    onChange: (arg0: { name: FilterField; value: FilterValue }) => void;
};

export const Filters: FC<Props> = ({ filter, onChange }) => (
    <Container
        sx={(theme) => ({
            '& .leadTextSection': {
                marginTop: '50px',
            },
            '& .sectionPickerSection': {
                marginTop: '40px',
            },
            '& .secondTitle': {
                marginTop: '40px',
            },
            '& .bottomFiltersSection': {
                marginTop: '20px',
            },
            [theme.breakpoints.down('md')]: {
                '& .leadTextSection': {
                    marginTop: '30px',
                },
                '& .sectionPickerSection': {
                    marginTop: '20px',
                },
            },
            [theme.breakpoints.down('sm')]: {
                '& .secondTitle': {
                    marginTop: '20px',
                },
            },
        })}
    >
        <Typography
            sx={{
                textTransform: 'uppercase',
                fontSize: '13px',
            }}
        >
            <Link href="/" preset="primary">
                Главная
            </Link>
            <span> - каталог</span>
        </Typography>
        <BlockTitle>
            <Typography variant="h4">Каталог</Typography>
        </BlockTitle>
        <section className="leadTextSection">
            <LeadText selectedSection={filter.section} />
        </section>
        <section className="sectionPickerSection">
            <SectionPicker options={filterOptions.sections} value={filter.section} onChange={onChange} />
        </section>
        <section className="secondTitle">
            <BlockTitle>
                <Typography variant="h4">{find(filterOptions.sections, { id: filter.section })?.title}</Typography>
            </BlockTitle>
        </section>
        <section className="bottomFiltersSection">
            <BottomFilters filter={filter} onChange={onChange} />
        </section>
    </Container>
);
