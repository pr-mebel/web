import { Filter, FilterField, FilterValue, Item, SectionID } from '@/entities';

type State = Record<SectionID, Item[]> & {
    filters: Filter;
    currentItemID: number | null;
    page: number;
    areParamsParsed: boolean;
    loading: boolean;
};

export const initialState: State = {
    accessories: [],
    cupboard: [],
    lightingSystems: [],
    wardrobe: [],
    filters: {
        doorType: 'any',
        section: 'cupboard',
        style: 'any',
    },
    currentItemID: null,
    page: 1,
    areParamsParsed: false,
    loading: false,
};

type SetListAction = {
    type: 'use-cards/setList';
    payload: {
        section: SectionID;
        items: Item[];
    };
};

type SetFilterAction = {
    type: 'use-cards/setFilter';
    payload: {
        name: FilterField;
        value: FilterValue;
    };
};

type SetActiveItem = {
    type: 'use-cards/setActiveItem';
    payload: number | null;
};

type IncrementActiveItem = {
    type: 'use-cards/incrementActiveItem';
};

type DecrementActiveItem = {
    type: 'use-cards/decrementActiveItem';
};

type IncrementPage = {
    type: 'use-cards/incrementPage';
};

type ResetPage = {
    type: 'use-cards/resetPage';
};

type SetParamsParsed = {
    type: 'use-cards/setParamsParsed';
};

type ToggleLoading = {
    type: 'use-cards/toggleLoading';
    payload: boolean;
};

type Action =
    | SetListAction
    | SetFilterAction
    | SetActiveItem
    | IncrementActiveItem
    | DecrementActiveItem
    | IncrementPage
    | ResetPage
    | SetParamsParsed
    | ToggleLoading;

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'use-cards/setList': {
            return {
                ...state,
                [action.payload.section]: action.payload.items,
            };
        }
        case 'use-cards/setFilter': {
            let newFiltersState: Partial<State['filters']> = {};

            if (action.payload.name === 'section') {
                newFiltersState = {
                    style: 'any',
                    doorType: 'any',
                };
            }

            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...newFiltersState,
                    [action.payload.name]: action.payload.value,
                },
            };
        }
        case 'use-cards/setActiveItem': {
            return {
                ...state,
                currentItemID: action.payload,
            };
        }
        case 'use-cards/incrementActiveItem': {
            return {
                ...state,
                currentItemID: state.currentItemID !== null ? state.currentItemID + 1 : state.currentItemID,
            };
        }
        case 'use-cards/decrementActiveItem': {
            return {
                ...state,
                currentItemID: state.currentItemID !== null ? state.currentItemID - 1 : state.currentItemID,
            };
        }
        case 'use-cards/incrementPage': {
            return {
                ...state,
                page: state.page + 1,
            };
        }
        case 'use-cards/resetPage': {
            return {
                ...state,
                page: 1,
            };
        }
        case 'use-cards/setParamsParsed': {
            return {
                ...state,
                areParamsParsed: true,
            };
        }
        case 'use-cards/toggleLoading': {
            return {
                ...state,
                loading: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};
