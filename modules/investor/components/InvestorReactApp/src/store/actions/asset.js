
import {assetActionTypes} from "../../types/asset";
import {
    getAsset,
    getAssetExpanded,
    getAssets,
    getAssetsExpanded,
    getAssetsCategories
} from '../../api/asset';

const {
    FETCH_ASSET,
    FETCH_ASSET_SUCCESS,
    FETCH_ASSET_ERROR
} = assetActionTypes;

export const fetchAssets = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_ASSET
            });
            
            setTimeout(() => {
                getAssets()
                    .then(res => dispatch({
                        type: FETCH_ASSET_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log('dispatch assets error', err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_ASSET_ERROR,
                payload: 'Ошибка при загрузке списка активов!'
            });
        }
    }
}

export const fetchAssetsExpanded = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_ASSET
            });
            
            setTimeout(() => {
                getAssetsExpanded()
                    .then(res => dispatch({
                        type: FETCH_ASSET_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log('dispatch assets expanded error', err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_ASSET_ERROR,
                payload: 'Ошибка при загрузке списка активов!'
            });
        }
    }
}

export const fetchAsset = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_ASSET
            });
            
            setTimeout(() => {
                getAsset(id)
                    .then(res => dispatch({
                        type: FETCH_ASSET_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log('dispatch asset error', err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_ASSET_ERROR,
                payload: 'Ошибка при загрузке актива!'
            });
        }
    }
}

export const fetchAssetExpanded = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_ASSET
            });
            
            setTimeout(() => {
                getAssetExpanded(id)
                    .then(res => dispatch({
                        type: FETCH_ASSET_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log('dispatch asset expanded error', err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_ASSET_ERROR,
                payload: 'Ошибка при загрузке актива!'
            });
        }
    }
}

export const fetchAssetsCategories = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_ASSET
            });
            
            setTimeout(() => {
                getAssetsCategories(id)
                    .then(res => dispatch({
                        type: FETCH_ASSET_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log('dispatch assets categories error', err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_ASSET_ERROR,
                payload: 'Ошибка при загрузке категорий активов!'
            });
        }
    }
}

