import React, { FC, useCallback, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { orderFormCtx } from '@/utils';

const useStyles = makeStyles((theme) => ({
    root: {
        lineHeight: '45px',
        background: theme.palette.primary.main,
        textAlign: 'center',
        fontSize: '12px',
        fontWeight: 600,
        textTransform: 'uppercase',
        color: 'white',
        border: `1px solid ${theme.palette.primary.main}`,
        transition: 'all .3s ease-in-out',
        cursor: 'pointer',
        width: '100%',
        '&:hover': {
            color: theme.palette.primary.main,
            background: 'white',
        },
        '&:focus': {
            outline: 'none',
        },
        '&:disabled, &:hover&:disabled': {
            color: theme.palette.primary.main,
            background: theme.palette.grey[200],
            cursor: 'auto',
        },
    },
    [theme.breakpoints.down('xs')]: {
        root: {
            fontSize: '10px',
        },
    },
}));

type Props = {
    disabled?: boolean;
    onClick?: () => void;
};

export const MainButton: FC<Props> = ({ disabled, children, onClick }) => {
    const classes = useStyles();
    const orderForm = useContext(orderFormCtx);

    /**
     * Обработчик клика по кнопке
     */
    const handleClick = useCallback(() => {
        if (onClick) {
            onClick();
        } else {
            orderForm.onOpen();
        }
    }, [orderForm, onClick]);

    return (
        <button
            type="button"
            disabled={!!disabled}
            className={classes.root}
            onClick={handleClick}
        >
            {children}
        </button>
    );
};
