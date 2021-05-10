import { SectionID, StyleID, DoorTypeID, FilterField, FilterValue } from '@/entities';

export type FiltersProps = {
    filter: {
        section: SectionID;
        style: StyleID;
        doorType: DoorTypeID;
    };
    onChange: (arg0: { name: FilterField; value: FilterValue }) => void;
};
