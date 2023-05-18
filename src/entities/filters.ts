import { z } from 'zod';

export const sectionIDs = z.enum(['cupboard', 'wardrobe', 'accessories', 'lightingSystems']);
export type SectionID = z.infer<typeof sectionIDs>;
export const styleIDs = z.enum(['any', 'modern', 'classic', 'neoclassic', 'designer']);
export type StyleID = z.infer<typeof styleIDs>;
export const doorTypeIDs = z.enum(['any', 'coupe', 'swing', 'folding']);
export type DoorTypeID = z.infer<typeof doorTypeIDs>;

export const filterFields = z.enum(['section', 'style', 'doorType']);
export type FilterField = z.infer<typeof filterFields>;

export const filterZod = z.object({
    section: sectionIDs,
    style: styleIDs,
    doorType: doorTypeIDs,
});

export type Filter = z.infer<typeof filterZod>;

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
