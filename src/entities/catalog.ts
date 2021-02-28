type Image = {
    url: string;
};

export type Item = {
    collection: string;
    description: string;
    id: string;
    imageFull: Image;
    imageMedium: Image;
    imageMinified: Image;
    sys: {
        id: string;
    };
};
