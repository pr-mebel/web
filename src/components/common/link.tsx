import { Box, BoxProps, styled } from '@mui/material';
import NextLink from 'next/link';
import React, { ComponentProps, FC, forwardRef } from 'react';

type StyleProps = {
    preset?: 'default' | 'primary' | 'secondary';
    underline?: boolean;
};

type LinkProps = {
    external?: boolean;
    asButton?: boolean;
};

const RootBase = forwardRef<HTMLAnchorElement, LinkProps & BoxProps<'a'>>((props, ref) => (
    <Box ref={ref} component="a" {...props}>
        {props.children}
    </Box>
));

const Root = styled(RootBase, {
    shouldForwardProp: (prop) => prop !== 'preset' && prop !== 'underline',
})<StyleProps>(({ preset = 'default', underline, theme }) => {
    let color = 'inherit';

    if (preset === 'primary') {
        color = theme.palette.primary.main;
    }

    if (preset === 'secondary') {
        color = theme.palette.grey[500];
    }

    return {
        display: 'inline-block',
        textDecoration: underline ? 'underline' : 'none',
        cursor: 'pointer',
        color,
        transition: 'color .2s',
        '&:hover': {
            color: theme.palette.primary.main,
            textDecoration: 'none',
        },
    };
});

export const Link: FC<ComponentProps<typeof Root>> = ({ href, external, asButton, children, ...rest }) => {
    if (asButton) {
        return <Root {...rest}>{children}</Root>;
    }

    if (external) {
        return (
            <Root {...rest} href={href} target="_blank" rel="noopener noreferrer">
                {children}
            </Root>
        );
    }

    return (
        <NextLink passHref href={href || '/'}>
            <Root {...rest}>{children}</Root>
        </NextLink>
    );
};
