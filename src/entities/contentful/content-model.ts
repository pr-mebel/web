export const CMSsectionCollectionIDs = [
    'CupboardSectionCollection',
    'WardrobeSectionCollection',
    'AccessoriesSectionCollection',
    'LightingSystemsSectionCollection',
] as const;
export type CMSSectionCollectionID = typeof CMSsectionCollectionIDs[number];

export const CMScardCollectionIDs = ['CupboardCollection', 'WardrobeCollection'] as const;
export type CMSCardCollectionID = typeof CMScardCollectionIDs[number];
