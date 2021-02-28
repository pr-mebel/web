export enum SectionId {
    cupboard = 'cupboard',
    wardrobe = 'wardrobe',
    accessories = 'accessories',
    lightingSystems = 'lightingSystems',
}

export enum StyleId {
    any = 'any',
    modern = 'modern',
    classic = 'classic',
    neoclassic = 'neoclassic',
    designer = 'designer',
}

export enum DoorTypeId {
    any = 'any',
    coupe = 'coupe',
    swing = 'swing',
    folding = 'folding',
}

export enum FilterField {
    section = 'section',
    style = 'style',
    doorType = 'doorType',
}

export type Filter = {
    section: SectionId;
    style: StyleId;
    doorType: DoorTypeId;
};

export type FilterKeyValue = {
    name: FilterField.section;
    value: SectionId;
} | {
    name: FilterField.style;
    value: StyleId;
} | {
    name: FilterField.doorType;
    value: DoorTypeId;
};

export const filters = {
    sections: [
        {
            title: 'Шкафы',
            id: SectionId.cupboard,
        },
        {
            title: 'Гардеробные',
            id: SectionId.wardrobe,
        },
        {
            title: 'Аксессуары',
            id: SectionId.accessories,
        },
        {
            title: 'Cистемы подсветки',
            id: SectionId.lightingSystems,
        },
    ],
    styles: [
        {
            title: 'Все',
            id: StyleId.any,
        },
        {
            title: 'Современные',
            id: StyleId.modern,
        },
        {
            title: 'Классические',
            id: StyleId.classic,
        },
        {
            title: 'Неоклассика',
            id: StyleId.neoclassic,
        },
        {
            title: 'Дизайнерские',
            id: StyleId.designer,
        },
    ],
    doorTypes: [
        {
            title: 'Все',
            id: DoorTypeId.any,
        },
        {
            title: 'Купе',
            id: DoorTypeId.coupe,
        },
        {
            title: 'Распашные',
            id: DoorTypeId.swing,
        },
        {
            title: 'Складные',
            id: DoorTypeId.folding,
        },
    ],
} as const;
