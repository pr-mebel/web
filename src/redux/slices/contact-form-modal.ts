import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    marker: null as string | null,
};

const contactFormModalSlice = createSlice({
    name: 'contactFormModal',
    initialState,
    reducers: {
        openContactFormModal(state, { payload }: PayloadAction<string | undefined>) {
            state.isOpen = true;
            state.marker = payload || null;
        },
        closeContactFormModal(state) {
            state.isOpen = false;
            state.marker = null;
        },
    },
});

export const { openContactFormModal, closeContactFormModal } = contactFormModalSlice.actions;
export default contactFormModalSlice.reducer;
