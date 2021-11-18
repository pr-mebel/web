import { noop } from 'lodash';
import { useState, useCallback } from 'react';

export const useModal = ({
    initialOpen = false,
    onOpen = noop,
    onClose = noop,
    onToggle = noop,
} = {}) => {
    const [isOpen, setIsOpen] = useState(initialOpen);

    const handleOpen = useCallback(
        (...args) => {
            onOpen(...args);
            setIsOpen(true);
        },
        [onOpen]
    );

    const handleClose = useCallback(
        (...args) => {
            onClose(args);
            setIsOpen(false);
        },
        [onClose]
    );

    const handleToggle = useCallback(
        (...args) => {
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
