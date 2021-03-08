export type ImageProgressiveProps = {
    src: string;
    alt: string;
    quality?: number;
    className?: string;
    onMinImageLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}