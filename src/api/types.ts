export type SendEmailParams = {
    email?: string;
    name: string;
    tel: string;
    description?: string;
    place: string;
    meta?: Record<string, unknown>;
    files?: File[];
};

export type UploadFilesParams = {
    files: FileList;
};

export type FetchFAQRespone = {
    data: {
        title: string;
        text: string;
    }[];
};
