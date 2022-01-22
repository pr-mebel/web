import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
};

const contactFormModalSlice = createSlice({
    name: 'contactFormModal',
    initialState,
    reducers: {
        openContactFormModal(state) {
            state.isOpen = true;
        },
        closeContactFormModal(state) {
            state.isOpen = false;
        },
    },
});

export const { openContactFormModal, closeContactFormModal } = contactFormModalSlice.actions;
export default contactFormModalSlice.reducer;
