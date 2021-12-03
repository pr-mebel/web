import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/redux';
import {
    openFormSubmitModal,
    closeFormSubmitModal,
} from '@/redux/slices/form-submit-modal';

export const useFormSubmitModal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: State) => state.formSubmitModal.isOpen);

    const handleOpen = useCallback(() => {
        dispatch(openFormSubmitModal());
    }, [dispatch]);

    const handleClose = useCallback(() => {
        dispatch(closeFormSubmitModal());
    }, [dispatch]);

    return {
        isOpen,
        onOpen: handleOpen,
        onClose: handleClose,
    };
};
