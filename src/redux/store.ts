import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './index';

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV === 'development',
    preloadedState: {},
});

export default store;
