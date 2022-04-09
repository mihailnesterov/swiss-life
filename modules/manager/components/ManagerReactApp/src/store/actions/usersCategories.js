
import {usersCategoriesActionTypes} from "../../types/usersCategories";
import {
    getUsersCategories
} from '../../api/user';

const {
    FETCH_USERS_CATEGORIES,
    FETCH_USERS_CATEGORIES_SUCCESS,
    FETCH_USERS_CATEGORIES_ERROR
} = usersCategoriesActionTypes;

export const fetchUsersCategories = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_USERS_CATEGORIES
            });
            
            setTimeout(() => {
                getUsersCategories()
                    .then(res => dispatch({
                        type: FETCH_USERS_CATEGORIES_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log('dispatch users categories error', err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_USERS_CATEGORIES_ERROR,
                payload: 'Ошибка при загрузке категорий пользователей!'
            });
        }
    }
}

