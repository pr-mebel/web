import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { FormSubmitPopup } from '@/blocks/common';

type State = {
    show: () => void;
};

const FormSubmitionContext = createContext<State | null>(null);

type FormSubmitionProviderProps = {
    children: React.ReactNode;
};

export const FormSubmitionProvider = ({ children }: FormSubmitionProviderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [reference, setReference] = useState<NodeJS.Timeout | null>(null);

    const show = useCallback(() => {
        setIsOpen(true);

        const reference = setTimeout(() => {
            setIsOpen(false);
        }, 5000);

        setReference(reference);
    }, []);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        if (reference) {
            clearTimeout(reference);
        }
    }, [reference]);

    const value = useMemo(() => ({ show }), [show]);

    return (
        <FormSubmitionContext.Provider value={value}>
            {children}
            <FormSubmitPopup isOpen={isOpen} onClose={handleClose} />
        </FormSubmitionContext.Provider>
    );
};

export const useFormSubmition = () => {
    const context = useContext(FormSubmitionContext);

    if (!context) {
        throw new Error('useFormSubmition must be used within a FormSubmitionProvider');
    }

    return context;
};
