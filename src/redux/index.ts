import { combineReducers } from '@reduxjs/toolkit';

import contactFormModal from './slices/contact-form-modal';
import formSubmitModal from './slices/form-submit-modal';

export const rootReducer = combineReducers({
    formSubmitModal,
    contactFormModal,
});

export type State = ReturnType<typeof rootReducer>;
