import { State } from '@/redux';

export const catalogSelector = (state: State) => state.catalog;

export const getFormState = (state: State) => state.form;

export const orderFormPopupSelector = (state: State) => state.orderFormPopup;
