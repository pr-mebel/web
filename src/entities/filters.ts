import { filters } from '@/constants';

export const sectionIDs = filters.sections.map((section) => section.id);
export type SectionID = typeof filters.sections[number]['id'];
export const styleIDs = filters.styles.map((style) => style.id);
export type StyleID = typeof filters.styles[number]['id'];
export const doorTypeIDs = filters.doorTypes.map((doorTypes) => doorTypes.id);
export type DoorTypeID = typeof filters.doorTypes[number]['id'];

export const filterFields = ['section', 'style', 'doorType'] as const;
export type FilterField = typeof filterFields[number];

export type Filter = {
    section: SectionID;
    style: StyleID;
    doorType: DoorTypeID;
};

export type FilterValue = SectionID | StyleID | DoorTypeID;

export type FilterKeyValue =
    | {
          name: 'section';
          value: SectionID;
      }
    | {
          name: 'style';
          value: StyleID;
      }
    | {
          name: 'doorType';
          value: DoorTypeID;
      };
