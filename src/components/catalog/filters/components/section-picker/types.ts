import { filters, SectionID, Filter } from '@/entities';

export type SectionPickerProps = {
    options: typeof filters.sections;
    value: SectionID;
    onChange: (arg0: { name: keyof Filter; value: Filter }) => void;
};
