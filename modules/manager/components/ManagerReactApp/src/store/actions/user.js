
import {userActionTypes} from "../../types/user";
import {
    getUserAuthorized,
    getUserAuthorizedExpanded
} from '../../api/user';

const {
    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR
} = userActionTypes;

export const fetchUserAuthorized = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_USER
            });
            
            setTimeout(() => {
                getUserAuthorized()
                    .then(res => dispatch({
                        type: FETCH_USER_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log(err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_USER_ERROR,
                payload: 'Ошибка при загрузке авторизованного пользователя!'
            });
        }
    }
}

export const fetchUserAuthorizedExpanded = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_USER
            });
            
            setTimeout(() => {
                getUserAuthorizedExpanded()
                    .then(res => dispatch({
                        type: FETCH_USER_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log(err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_USER_ERROR,
                payload: 'Ошибка при загрузке авторизованного пользователя!'
            });
        }
    }
}