import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
};

const formSubmitModalSlice = createSlice({
    name: 'formSubmitModal',
    initialState,
    reducers: {
        openFormSubmitModal(state) {
            state.isOpen = true;
        },
        closeFormSubmitModal(state) {
            state.isOpen = false;
        },
    },
});

export const { openFormSubmitModal, closeFormSubmitModal } = formSubmitModalSlice.actions;
export default formSubmitModalSlice.reducer;
