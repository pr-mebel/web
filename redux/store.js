import { configureStore, combineReducers } from '@reduxjs/toolkit';
import catalog from './reducers/catalog';
import form from './reducers/form';
import orderFormPopup from './reducers/order-form-popup';

const store = configureStore({
  reducer: combineReducers({
    catalog,
    form,
    orderFormPopup,
  }),
  devTools: process.env.NODE_ENV !== 'development',
  preloadedState: {},
});

export default store;
