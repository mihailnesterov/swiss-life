import {assetActionTypes} from '../../types/asset';

const {
    FETCH_ASSET,
    FETCH_ASSET_SUCCESS,
    FETCH_ASSET_ITEM_SUCCESS,
    FETCH_ASSET_ERROR
} = assetActionTypes;

const initialState = {
    assets: [],
    links: {},
    meta: {},
    loading: false,
    error: null
};

export const assetReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ASSET:
            return {
                assets: [],
                links: {},
                meta: {},
                loading: true,
                error: null
            }
        case FETCH_ASSET_SUCCESS:
            return {
                assets: action.payload.assets,
                links: action.payload._links,
                meta: action.payload._meta,
                loading: false,
                error: null
            }
        case FETCH_ASSET_ITEM_SUCCESS:
            return {
                assets: [action.payload.assets],
                links: action.payload._links,
                meta: action.payload._meta,
                loading: false,
                error: null
            }
        case FETCH_ASSET_ERROR:
            return {
                assets: [],
                links: {},
                meta: {},
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}