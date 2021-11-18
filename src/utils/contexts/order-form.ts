import { noop } from 'lodash';
import { createContext } from 'react';

type CTX = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const orderFormCtx = createContext<CTX>({
    isOpen: false,
    onOpen: noop,
    onClose: noop,
});
