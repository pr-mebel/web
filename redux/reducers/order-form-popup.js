import { createSlice } from '@reduxjs/toolkit';

const orderFormPopupSlice = createSlice({
  name: 'orderFormPopup',
  initialState: { isOpen: false },
  reducers: {
    openOrderFormPopup(state) {
      state.isOpen = true;
    },
    closeOrderFormPopup(state) {
      state.isOpen = false;
    },
  },
});

export const { openOrderFormPopup, closeOrderFormPopup } = orderFormPopupSlice.actions;
export default orderFormPopupSlice.reducer;
