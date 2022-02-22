import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { State } from '@/redux';
import { closeContactFormModal, openContactFormModal } from '@/redux/slices/contact-form-modal';

export const useContactFormModal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: State) => state.contactFormModal.isOpen);

    const handleOpen = useCallback(
        (marker?: string) => {
            dispatch(openContactFormModal(marker));
        },
        [dispatch]
    );

    const handleClose = useCallback(() => {
        dispatch(closeContactFormModal());
    }, [dispatch]);

    return {
        isOpen,
        onOpen: handleOpen,
        onClose: handleClose,
    };
};
