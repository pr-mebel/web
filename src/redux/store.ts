import { configureStore } from '@reduxjs/toolkit';

import { isProduction } from '@/utils';

import { rootReducer } from './index';

const store = configureStore({
    reducer: rootReducer,
    devTools: !isProduction(),
    preloadedState: {},
});

export default store;
