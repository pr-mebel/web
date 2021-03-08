import { filters, SectionId } from '@/entities';

export type SectionPickerProps = {
    options: typeof filters.sections;
    value: SectionId;
    onChange: Function;
};
