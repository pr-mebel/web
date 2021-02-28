import { combineReducers } from '@reduxjs/toolkit';
import catalog from './reducers/catalog';
import form from './reducers/form';
import orderFormPopup from './reducers/order-form-popup';

export const rootReducer = combineReducers({
    catalog,
    form,
    orderFormPopup,
});

export type State = ReturnType<typeof rootReducer>;

export * from './reducers';
