import { filters } from '__constants__';
import {
  FETCH_CATALOG_REQUEST,
  FETCH_CATALOG_SUCCESS,
  FETCH_CATALOG_FAILURE,
  CHANGE_FILTER,
  CHANGE_PAGE,
  RESET_CATALOG,
  RESET_FILTERS,
  OPEN_CARD_POPUP,
  CLOSE_CARD_POPUP,
  GO_TO_NEXT_CARD,
  GO_TO_PREV_CARD,
  OPEN_FULL_SCREEN_POPUP,
  CLOSE_FULL_SCREEN_POPUP,
} from '../actions';

const initialState = {
  items: [],
  isLoading: false,
  filter: {
    section: filters.sections[0].id,
    style: filters.styles[0].id,
    doorType: filters.doorTypes[0].id,
  },
  hasMore: true,
  page: 0,
  currentItemId: 0,
  isCardPopupOpen: false,
  isFullScreenPopupOpen: false,
};

export const catalog = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATALOG_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FETCH_CATALOG_SUCCESS: {
      const { items, total } = action.payload;
      const newItems = [...state.items, ...items];

      return {
        ...state,
        items: newItems,
        isLoading: false,
        hasMore: total > newItems.length,
      };
    }
    case FETCH_CATALOG_FAILURE: {
      return {
        ...state,
        items: [],
        isLoading: false,
        hasMore: false,
      };
    }
    case CHANGE_FILTER: {
      const { name, value } = action.payload;

      if (name === 'section') {
        if (value === 'accessories' || value === 'lightingSystems') {
          return {
            ...state,
            filter: {
              ...state.filter,
              section: value,
              style: 'any',
              doorType: 'any',
            },
          };
        }
        if (value === 'wardrobe') {
          return {
            ...state,
            filter: {
              ...state.filter,
              section: value,
              doorType: 'any',
            },
          };
        }
      }

      return {
        ...state,
        filter: {
          ...state.filter,
          [name]: value,
        },
      };
    }
    case CHANGE_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }
    case RESET_CATALOG: {
      return {
        ...state,
        items: [],
        page: 0,
        hasMore: true,
      };
    }
    case RESET_FILTERS: {
      return {
        ...state,
        filter: {
          section: filters.sections[0].id,
          style: filters.styles[0].id,
          doorType: filters.styles[0].id,
        },
      };
    }
    case OPEN_CARD_POPUP: {
      return {
        ...state,
        currentItemId: action.payload,
        isCardPopupOpen: true,
      };
    }
    case CLOSE_CARD_POPUP: {
      return {
        ...state,
        currentItemId: 0,
        isCardPopupOpen: false,
      };
    }
    case GO_TO_NEXT_CARD: {
      return {
        ...state,
        currentItemId: state.currentItemId + 1,
      };
    }
    case GO_TO_PREV_CARD: {
      return {
        ...state,
        currentItemId: state.currentItemId - 1,
      };
    }
    case OPEN_FULL_SCREEN_POPUP: {
      return {
        ...state,
        currentItemId: action.payload,
        isFullScreenPopupOpen: true,
      };
    }
    case CLOSE_FULL_SCREEN_POPUP: {
      return {
        ...state,
        isFullScreenPopupOpen: false,
      };
    }
    default: {
      return state;
    }
  }
};
