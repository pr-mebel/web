import { Input as MUIInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React, { ComponentPropsWithRef, FC, forwardRef } from 'react';

const useStyles = makeStyles({
    input: {
        paddingLeft: '30px',
        paddingRight: '30px',
    },

    inputDark: {
        color: 'white',
        '&:placeholder': {
            color: 'white',
        },
    },

    rootDark: {
        '&:hover&:before,&:before': {
            borderColor: 'white',
        },
    },
});

type InputProps = ComponentPropsWithRef<typeof MUIInput> & {
    darkMode?: boolean;
};

// eslint-disable-next-line react/display-name
export const Input: FC<InputProps> = forwardRef(({ darkMode, ...rest }, ref) => {
    const classes = useStyles();

    return (
        <MUIInput
            {...rest}
            inputRef={ref}
            classes={{
                root: classNames({
                    [classes.rootDark]: darkMode,
                }),
                input: classNames(classes.input, {
                    [classes.inputDark]: darkMode,
                }),
            }}
        />
    );
});
