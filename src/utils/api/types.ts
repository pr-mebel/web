import {
    SectionId,
    StyleId,
    DoorTypeId,
    SectionCollection,
    Collection
} from '@/entities';

export type FetchCatalogByFilterParams = {
    section: SectionId;
    style: StyleId;
    doorType: DoorTypeId;
};

export interface CatalogResponse {
    data:
    | {
        cupboardSectionCollection: SectionCollection;
    }
    | {
        wardrobeSectionCollection: SectionCollection;
    }
    | {
        accessoriesSectionCollection: SectionCollection;
    }
    | {
        lightingSystemsSectionCollection: SectionCollection;
    }
    | {
        cupboardCollection: Collection;
    }
    | {
        wardrobeCollection: Collection;
    };
}

export type SendEmailParams = {
    email?: string;
    name: string;
    tel: string;
    description?: string;
    files?: {
        name: string;
    }[];
}

export type UploadFilesParams = {
    files: FileList;
}