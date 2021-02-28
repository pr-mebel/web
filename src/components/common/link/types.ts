export type LinkProps = {
    to?: string;
    external?: boolean;
    asButton?: boolean;
    children: React.ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLSpanElement>;
};
