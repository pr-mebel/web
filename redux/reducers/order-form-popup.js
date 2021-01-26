import {
  OPEN_ORDER_FORM_POPUP,
  CLOSE_ORDER_FORM_POPUP,
} from '../actions';

const initialState = {
  isOpen: false,
};

export const orderFormPopup = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_ORDER_FORM_POPUP: {
      return {
        ...state,
        isOpen: true,
      };
    }
    case CLOSE_ORDER_FORM_POPUP: {
      return {
        ...state,
        isOpen: false,
      };
    }
    default: {
      return state;
    }
  }
};
