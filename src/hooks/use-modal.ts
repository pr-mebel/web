/* eslint-disable @typescript-eslint/no-explicit-any */
import { noop } from 'lodash';
import { useCallback, useState } from 'react';

type UseModalProps<TO extends any[], TC extends any[], TT extends any[]> = {
    initialOpen?: boolean;
    onOpen?: (...args: TO) => void;
    onClose?: (...args: TC) => void;
    onToggle?: (...args: TT) => void;
};

export type UseModal<
    TO extends any[] = any[],
    TC extends any[] = any[],
    TT extends any[] = any[]
> = {
    isOpen: boolean;
    handleOpen: (...args: TO) => void;
    handleClose: (...args: TC) => void;
    handleToggle: (...args: TT) => void;
};

export const useModal = <TO extends any[], TC extends any[], TT extends any[]>({
    initialOpen = false,
    onOpen = noop,
    onClose = noop,
    onToggle = noop,
}: UseModalProps<TO, TC, TT> = {}): UseModal<TO, TC, TT> => {
    const [isOpen, setIsOpen] = useState(initialOpen);

    const handleOpen = useCallback(
        (...args: TO) => {
            onOpen(...args);
            setIsOpen(true);
        },
        [onOpen]
    );

    const handleClose = useCallback(
        (...args: TC) => {
            onClose(...args);
            setIsOpen(false);
        },
        [onClose]
    );

    const handleToggle = useCallback(
        (...args: TT) => {
            onToggle(...args);
            setIsOpen(!isOpen);
        },
        [isOpen, onToggle]
    );

    return {
        isOpen,
        handleOpen,
        handleClose,
        handleToggle,
    };
};
