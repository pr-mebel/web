import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { filters } from '__constants__';
import * as api from 'utils/api';
import { retrieveItemsFromResponse } from 'utils';

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

export const fetchCatalog = createAsyncThunk(
  'fetchCatalog',
  async (_, { rejectWithValue, getState }) => {
    const { filter, page } = getState().catalog;

    try {
      const response = await api.fetchCatalogByFilter(filter, page);

      return retrieveItemsFromResponse(response, filter);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    changeFilter(state, { payload }) {
      const { name, value } = payload;

      if (name === 'section') {
        if (value === 'accessories' || value === 'lightingSystems') {
          state.filter = {
            section: value,
            style: 'any',
            doorType: 'any',
          };

          return;
        }
        if (value === 'wardrobe') {
          state.filter = {
            ...state.filter,
            section: value,
            doorType: 'any',
          };

          return;
        }
      }

      state.filter[name] = value;
    },
    changePage(state, { payload }) {
      state.page = payload;
    },
    resetCatalog(state) {
      state.items = [];
      state.page = 0;
      state.hasMore = 0;
    },
    resetFilters(state) {
      state.filter = {
        section: filters.sections[0].id,
        style: filters.styles[0].id,
        doorType: filters.styles[0].id,
      };
    },
    openCardPopup(state, { payload }) {
      state.currentItemId = payload;
      state.isCardPopupOpen = true;
    },
    closeCardPopup(state) {
      state.currentItemId = 0;
      state.isCardPopupOpen = false;
    },
    goToNextCard(state) {
      state.currentItemId++;
    },
    goToPrevCard(state) {
      state.currentItemId--;
    },
    openFullScreenPopup(state, { payload }) {
      state.currentItemId = payload; // TODO: Проверить что тут вообще нужен payload
      state.isFullScreenPopupOpen = true;
    },
    closeFullScreenPopup(state) {
      state.isFullScreenPopupOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCatalog.fulfilled, (state, { payload }) => {
        const { items, total } = payload;
        const newItems = [...state.items, ...items];

        state.items = newItems;
        state.isLoading = false;
        state.hasMore = total > newItems.length;
      })
      .addCase(fetchCatalog.rejected, (state) => {
        state.items = [];
        state.isLoading = false;
        state.hasMore = false;
      });
  },
});

export const {
  changeFilter,
  changePage,
  resetCatalog,
  resetFilters,
  openCardPopup,
  closeCardPopup,
  goToNextCard,
  goToPrevCard,
  openFullScreenPopup,
  closeFullScreenPopup,
} = catalogSlice.actions;
export default catalogSlice.reducer;
