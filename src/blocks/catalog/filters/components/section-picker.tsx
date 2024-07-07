import { Box, Typography } from '@mui/material';
import clsx from 'clsx';
import React, { FC, useCallback } from 'react';

import { filters } from '@/constants';
import { FilterField, FilterValue, SectionID } from '@/entities';

type Props = {
  options: typeof filters.sections;
  value: SectionID;
  onChange: (arg0: { name: FilterField; value: FilterValue }) => void;
};

export const SectionPicker: FC<Props> = ({ options, value, onChange }) => {
  const handleClick = useCallback(
    (value: FilterValue) => () => {
      onChange({
        name: 'section',
        value,
      });
    },
    [onChange],
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={(theme) => ({
          borderRadius: '5px',
          padding: '11px 48px 10px',
          display: 'inline-flex',
          alignItems: 'center',
          background: theme.palette.grey[100],
          '& .option': {
            cursor: 'pointer',
            padding: '0 20px',
            textTransform: 'uppercase',
          },
          '& .selectedOption': {
            cursor: 'default',
            color: theme.palette.primary.main,
          },
          [theme.breakpoints.down('md')]: {
            padding: '8px 15px 7px',
            background: 'none',
            display: 'flex',
            flexDirection: 'column',
            '& .option': {
              option: {
                padding: '3px 10px',
                fontSize: '14px',
                fontWeight: '600',
              },
            },
            '& .dash': {
              display: 'none',
            },
          },
        })}
      >
        {options.map((section, i) => {
          if (i !== options.length - 1) {
            return (
              <React.Fragment key={section.id}>
                <Typography
                  variant="body1"
                  className={clsx('option', {
                    selectedOption: value === section.id,
                  })}
                  onClick={handleClick(section.id)}
                >
                  {section.title}
                </Typography>
                <span className="dash">&mdash;</span>
              </React.Fragment>
            );
          }

          return (
            <Typography
              key={section.id}
              variant="body1"
              className={clsx('option', {
                selectedOption: value === section.id,
              })}
              onClick={handleClick(section.id)}
            >
              {section.title}
            </Typography>
          );
        })}
      </Box>
    </Box>
  );
};
