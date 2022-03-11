
import {assetCategoriesActionTypes} from "../../types/assetCategories";
import {
    getAssetsCategories
} from '../../api/asset';

const {
    FETCH_ASSET_CATEGORIES,
    FETCH_ASSET_CATEGORIES_SUCCESS,
    FETCH_ASSET_CATEGORIES_ERROR
} = assetCategoriesActionTypes;

export const fetchAssetsCategories = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_ASSET_CATEGORIES
            });
            
            setTimeout(() => {
                getAssetsCategories()
                    .then(res => dispatch({
                        type: FETCH_ASSET_CATEGORIES_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log('dispatch assets categories error', err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_ASSET_CATEGORIES_ERROR,
                payload: 'Ошибка при загрузке категорий активов!'
            });
        }
    }
}

