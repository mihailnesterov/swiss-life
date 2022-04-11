
import {adminsActionTypes} from "../../types/admins";
import {
    getRoleAdmin,
    getRoleAdminExpanded
} from '../../api/user';

const {
    FETCH_ADMINS,
    FETCH_ADMINS_SUCCESS,
    FETCH_ADMINS_ERROR
} = adminsActionTypes;

export const fetchRoleAdmin = (params) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_ADMINS
            });
            
            setTimeout(() => {
                getRoleAdmin(params)
                    .then(res => dispatch({
                        type: FETCH_ADMINS_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log(err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_ADMINS_ERROR,
                payload: 'Ошибка при загрузке администраторов!'
            });
        }
    }
}

export const fetchRoleAdminExpanded = (params) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_ADMINS
            });
            
            setTimeout(() => {
                getRoleAdminExpanded(params)
                    .then(res => dispatch({
                        type: FETCH_ADMINS_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log(err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_ADMINS_ERROR,
                payload: 'Ошибка при загрузке администраторов!'
            });
        }
    }
}