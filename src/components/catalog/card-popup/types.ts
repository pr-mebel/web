import { MouseEventHandler } from 'react';

type Image = {
    url: string;
};

export type CardPopupProps = {
    isOpen: boolean;
    isLoading: boolean;
    items: {
        id: string;
        collection: string;
        description?: string;
        imageFull: Image;
        imageMedium: Image;
        imageMinified: Image;
    }[];
    currentItemId: number;
    onClose: MouseEventHandler<SVGSVGElement>;
    onClickBack: Function;
    onClickForward: Function;
    onDownloadMoreCards: Function;
    onFullScreenPopupOpen: Function;
};
