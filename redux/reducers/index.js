import { combineReducers } from '@reduxjs/toolkit';

import { catalog } from './catalog';
import { orderFormPopup } from './order-form-popup';
import { form } from './form';

export default combineReducers({
  catalog,
  orderFormPopup,
  form,
});
