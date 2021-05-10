import { FilterField, filters, FilterValue, SectionID } from '@/entities';

export type SectionPickerProps = {
    options: typeof filters.sections;
    value: SectionID;
    onChange: (arg0: { name: FilterField; value: FilterValue }) => void;
};
