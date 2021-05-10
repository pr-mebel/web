import {
    SectionID,
    StyleID,
    DoorTypeID,
    SectionCollection,
    Collection,
} from '@/entities';

export type FetchCatalogByFilterParams = {
    section: SectionID;
    style: StyleID;
    doorType: DoorTypeID;
};

export interface CatalogResponse {
    result: SectionCollection | Collection;
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
