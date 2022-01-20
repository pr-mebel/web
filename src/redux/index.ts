import { combineReducers } from '@reduxjs/toolkit';
import formSubmitModal from './slices/form-submit-modal';
import contactFormModal from './slices/contact-form-modal';

export const rootReducer = combineReducers({
    formSubmitModal,
    contactFormModal,
});

export type State = ReturnType<typeof rootReducer>;
