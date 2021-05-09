import { Filter, SectionID, StyleID, DoorTypeID } from '@/entities';

export type FiltersProps = {
    filter: {
        section: SectionID;
        style: StyleID;
        doorType: DoorTypeID;
    };
    onChange: (arg0: { name: keyof Filter; value: Filter }) => void;
};
