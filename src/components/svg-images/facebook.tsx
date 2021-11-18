import React, { FC } from 'react';
import classnames from 'classnames';
import { SVGProps } from './types';

export const Facebook: FC<SVGProps> = ({
    width = 18,
    height = 18,
    fill = 'none',
    className,
}) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 18 18"
        fill={fill}
        className={classnames(className)}
    >
        <path
            d="M0 9c0-5 4-9 9-9s9 4 9 9-4 9-9 9-9-4-9-9zm7.8 3.3v1c0 1.5 0 1.5 1.5 1.5.5 0 .7-.1.7-.6v-3.8c0-.3 0-.6.5-.6 1.1 0 1.1 0 1.3-1.2v-.1c.1-.7.1-.8-.7-.8-1.2 0-1.2 0-1.2-1.3 0-.5.3-.7.8-.8 1.2 0 1.2-.1 1.2-1.3v-.2c0-.3-.1-.4-.4-.4h-1.4c-1.1 0-1.9.7-2.2 1.7-.2.6-.1 1.2-.1 1.8 0 .3-.1.5-.5.4h-.5c-.6 0-.8.2-.7.8 0 1.3 0 1.3 1.3 1.3.4 0 .4.2.4.5v2.1z"
            fill="#000"
        />
    </svg>
);
