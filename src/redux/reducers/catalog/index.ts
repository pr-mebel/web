import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SectionId, StyleId, DoorTypeId, FilterField, Item } from '@/entities';
import * as api from '@/utils/api';
import {
    ChangeFilterPayload,
    FetchCatalogFulfilledPayload,
    OpenFullScreenPopupPayload,
    valueIsStyle,
    valueIsDoorType,
} from './types';
import { State } from '@/redux';

const initialState = {
    items: [] as Item[],
    isLoading: false,
    filter: {
        [FilterField.section]: SectionId.cupboard,
        [FilterField.style]: StyleId.any,
        [FilterField.doorType]: DoorTypeId.any,
    },
    hasMore: true, // TODO: Why true?
    page: 0,
    currentItemId: 0,
    isCardPopupOpen: false,
    isFullScreenPopupOpen: false,
};

export const fetchCatalog = createAsyncThunk(
    'fetchCatalog',
    async (_, { rejectWithValue, getState }) => {
        const state = getState() as State;
        const { filter, page } = state.catalog;

        try {
            const response = await api.fetchCatalogByFilter(filter, page);

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        changeFilter(state, { payload }: ChangeFilterPayload) {
            const { name, value } = payload;

            if (name === FilterField.section) {
                if (value === SectionId.accessories || value === SectionId.lightingSystems) {
                    state.filter = {
                        section: value,
                        style: StyleId.any,
                        doorType: DoorTypeId.any,
                    };

                    return;
                }

                if (value === SectionId.wardrobe) {
                    state.filter = {
                        ...state.filter,
                        section: value,
                        style: state.filter.style === StyleId.designer
                            ? StyleId.any
                            : state.filter.style,
                        doorType: DoorTypeId.any,
                    };

                    return;
                }

                state.filter.section = SectionId.cupboard;

                return;
            }
            
            if (valueIsStyle(value)) {
                state.filter.style = value;
            }

            if (valueIsDoorType(value)) {
                state.filter.doorType = value;
            }
        },
        changePage(state, { payload }) {
            state.page = payload;
        },
        resetCatalog(state) {
            state.items = [];
            state.page = 0;
            state.hasMore = false;
        },
        resetFilters(state) {
            state.filter = initialState.filter;
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
        openFullScreenPopup(state, { payload }: OpenFullScreenPopupPayload) {
            state.currentItemId = payload;
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
            .addCase(fetchCatalog.fulfilled, (state, { payload }: FetchCatalogFulfilledPayload) => {
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
