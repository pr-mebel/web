import * as api from 'utils/api';
import { retrieveItemsFromResponse } from 'utils';

export const FETCH_CATALOG_REQUEST = 'FETCH_CATALOG_REQUEST';
export const FETCH_CATALOG_SUCCESS = 'FETCH_CATALOG_SUCCESS';
export const FETCH_CATALOG_FAILURE = 'FETCH_CATALOG_FAILURE';
export const CHANGE_FILTER = 'CHANGE_FILTER';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const RESET_CATALOG = 'RESET_CATALOG';
export const RESET_FILTERS = 'RESET_FILTERS';
export const OPEN_CARD_POPUP = 'OPEN_CARD_POPUP';
export const CLOSE_CARD_POPUP = 'CLOSE_CARD_POPUP';
export const GO_TO_NEXT_CARD = 'GO_TO_NEXT_CARD';
export const GO_TO_PREV_CARD = 'GO_TO_PREV_CARD';
export const OPEN_FULL_SCREEN_POPUP = 'OPEN_FULL_SCREEN_POPUP';
export const CLOSE_FULL_SCREEN_POPUP = 'CLOSE_FULL_SCREEN_POPUP';

export const fetchCatalog = () => async (dispatch, getState) => {
  const { filter, page } = getState().catalog;

  dispatch({
    type: FETCH_CATALOG_REQUEST,
  });

  try {
    const response = await api.fetchCatalogByFilter(filter, page);

    dispatch({
      type: FETCH_CATALOG_SUCCESS,
      payload: retrieveItemsFromResponse(response, filter),
    });
  } catch (error) {
    console.log(error);
  }
};

export const changeFilter = (filter) => ({
  type: CHANGE_FILTER,
  payload: filter,
});

export const changePage = (newPage) => ({
  type: CHANGE_PAGE,
  payload: newPage,
});

export const resetCatalog = () => ({
  type: RESET_CATALOG,
});

export const resetFilters = () => ({
  type: RESET_FILTERS,
});

export const openCardPopup = (currentItemId) => ({
  type: OPEN_CARD_POPUP,
  payload: currentItemId,
});

export const closeCardPopup = () => ({
  type: CLOSE_CARD_POPUP,
});

export const goToNextCard = () => ({
  type: GO_TO_NEXT_CARD,
});

export const goToPrevCard = () => ({
  type: GO_TO_PREV_CARD,
});

export const openFullScreenPopup = (currentItemId) => ({
  type: OPEN_FULL_SCREEN_POPUP,
  payload: currentItemId,
});

export const closeFullScreenPopup = () => ({
  type: CLOSE_FULL_SCREEN_POPUP,
});
