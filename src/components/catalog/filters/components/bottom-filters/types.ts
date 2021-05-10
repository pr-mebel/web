import { SectionID, StyleID, DoorTypeID, FilterField, FilterValue } from '@/entities';

export type BottomFiltersProps = {
    filter: {
        section: SectionID;
        style: StyleID;
        doorType: DoorTypeID;
    };
    onChange: (arg0: { name: FilterField; value: FilterValue }) => void;
};
