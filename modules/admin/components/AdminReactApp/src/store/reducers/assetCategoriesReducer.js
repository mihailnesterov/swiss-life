import {assetCategoriesActionTypes} from '../../types/assetCategories';

const {
    FETCH_ASSET_CATEGORIES,
    FETCH_ASSET_CATEGORIES_SUCCESS,
    FETCH_ASSET_CATEGORIES_ERROR
} = assetCategoriesActionTypes;

const initialState = {
    assetCategories: [],
    loading: false,
    error: null
};

export const assetCategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ASSET_CATEGORIES:
            return {
                assetCategories: [],
                loading: true,
                error: null
            }
        case FETCH_ASSET_CATEGORIES_SUCCESS:
            return {
                assetCategories: action.payload,
                loading: false,
                error: null
            }
        case FETCH_ASSET_CATEGORIES_ERROR:
            return {
                assetCategories: [],
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}