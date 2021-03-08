type Texts = {
    id: string;
    data: string;
};

export type PageProps = {
    titles: Texts[];
    subtitles?: Texts[];
    texts: Texts[];
    imageSet: {
        small: string;
        large: string;
        medium: string;
    };
    to: string;
};
