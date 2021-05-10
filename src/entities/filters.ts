export const sectionIDs = [
    'cupboard',
    'wardrobe',
    'accessories',
    'lightingSystems',
] as const;
export type SectionID = typeof sectionIDs[number];

export const styleIDs = [
    'any',
    'modern',
    'classic',
    'neoclassic',
    'designer',
] as const;
export type StyleID = typeof styleIDs[number];

export const doorTypeIDs = [
    'any',
    'coupe',
    'swing',
    'folding',
] as const;
export type DoorTypeID = typeof doorTypeIDs[number];

export const filterFields = [
    'section',
    'style',
    'doorType',
] as const;
export type FilterField = typeof filterFields[number];

export type Filter = {
    section: SectionID;
    style: StyleID;
    doorType: DoorTypeID;
};

export type FilterValue = SectionID | StyleID | DoorTypeID;

export type FilterKeyValue = {
    name: typeof filterFields[0];
    value: SectionID;
} | {
    name: typeof filterFields[1];
    value: StyleID;
} | {
    name: typeof filterFields[2];
    value: DoorTypeID;
};

type Filters = {
    sections: {
        title: string;
        id: SectionID;
    }[];
    styles: {
        title: string;
        id: StyleID;
    }[];
    doorTypes: {
        title: string;
        id: DoorTypeID;
    }[];
}

export const filters: Filters = {
    sections: [
        {
            title: 'Шкафы',
            id: 'cupboard',
        },
        {
            title: 'Гардеробные',
            id: 'wardrobe',
        },
        {
            title: 'Аксессуары',
            id: 'accessories',
        },
        {
            title: 'Cистемы подсветки',
            id: 'lightingSystems',
        },
    ],
    styles: [
        {
            title: 'Все',
            id: 'any',
        },
        {
            title: 'Современные',
            id: 'modern',
        },
        {
            title: 'Классические',
            id: 'classic',
        },
        {
            title: 'Неоклассика',
            id: 'neoclassic',
        },
        {
            title: 'Дизайнерские',
            id: 'designer',
        },
    ],
    doorTypes: [
        {
            title: 'Все',
            id: 'any',
        },
        {
            title: 'Купе',
            id: 'coupe',
        },
        {
            title: 'Распашные',
            id: 'swing',
        },
        {
            title: 'Складные',
            id: 'folding',
        },
    ],
};
