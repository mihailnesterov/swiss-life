import {assetActionTypes} from '../../types/asset';

const {
    FETCH_ASSET,
    FETCH_ASSET_SUCCESS,
    FETCH_ASSET_ERROR
} = assetActionTypes;

const initialState = {
    assets: [],
    loading: false,
    error: null
};

export const assetReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ASSET:
            return {
                assets: [],
                loading: true,
                error: null
            }
        case FETCH_ASSET_SUCCESS:
            return {
                assets: action.payload,
                loading: false,
                error: null
            }
        case FETCH_ASSET_ERROR:
            return {
                assets: [],
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}