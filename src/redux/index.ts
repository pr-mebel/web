import { combineReducers } from '@reduxjs/toolkit';
import form from './reducers/form';

export const rootReducer = combineReducers({
    form,
});

export type State = ReturnType<typeof rootReducer>;

export * from './reducers';
