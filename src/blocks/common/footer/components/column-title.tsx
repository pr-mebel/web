import { ComponentProps } from 'react';

import { Link } from '@/components';

export const ColumnTitle = (props: ComponentProps<typeof Link>) => (
    <Link
        sx={{
            marginBottom: '12px',
            width: '100%',
            textAlign: {
                xs: 'center',
                md: 'inherit',
            },
            textTransform: 'uppercase',
        }}
        {...props}
    >
        {props.children}
    </Link>
);
