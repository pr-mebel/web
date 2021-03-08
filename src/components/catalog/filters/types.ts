import { filters, SectionId, StyleId, DoorTypeId } from '@/entities';

export type FiltersProps = {
    options: typeof filters;
    filter: {
        section: SectionId;
        style: StyleId;
        doorType: DoorTypeId;
    };
    onChange: Function;
};
