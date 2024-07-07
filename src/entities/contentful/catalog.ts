import { z } from 'zod';

export const imageZod = z.object({
  url: z.string(),
  title: z.string(),
  width: z.number(),
  height: z.number(),
});
export type Image = z.infer<typeof imageZod>;

export const itemZod = z.object({
  collection: z.string(),
  description: z.string(),
  id: z.string(),
  modern: z.boolean().nullable(),
  classic: z.boolean().nullable(),
  neoclassic: z.boolean().nullable(),
  designer: z.boolean().nullable(),
  coupe: z.boolean().nullable(),
  swing: z.boolean().nullable(),
  folding: z.boolean().nullable(),
  imageFull: imageZod,
  imageMedium: imageZod,
  imageMinified: imageZod,
  sys: z.object({
    id: z.string(),
  }),
});
export type Item = z.infer<typeof itemZod>;

export const collectionZod = z.object({
  items: z.array(itemZod),
  total: z.number(),
});
export type Collection = z.infer<typeof collectionZod>;

export const sectionCollectionZod = z.object({
  items: z.array(
    z.object({
      cardsCollection: collectionZod,
    }),
  ),
  total: z.number(),
});
export type SectionCollection = z.infer<typeof sectionCollectionZod>;
