import Enum from '../utils/enum';

export const assetActionTypes = Enum({
    FETCH_ASSET: 'FETCH_ASSET',
    FETCH_ASSET_SUCCESS: 'FETCH_ASSET_SUCCESS',
    FETCH_ASSET_ITEM_SUCCESS: 'FETCH_ASSET_ITEM_SUCCESS',
    FETCH_ASSET_ERROR: 'FETCH_ASSET_ERROR'
});