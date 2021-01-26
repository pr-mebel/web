import { configureStore } from '@reduxjs/toolkit';
import preloadedState from './initial-state';
import reducer from '../reducers';

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV = 'development',
  preloadedState,
});

export default store;
