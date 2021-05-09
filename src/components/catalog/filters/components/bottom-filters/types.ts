import { Filter, SectionID, StyleID, DoorTypeID } from '@/entities';

export type BottomFiltersProps = {
    filter: {
        section: SectionID;
        style: StyleID;
        doorType: DoorTypeID;
    };
    onChange: (arg0: { name: keyof Filter; value: Filter }) => void;
};
