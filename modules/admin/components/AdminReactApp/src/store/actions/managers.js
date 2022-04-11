
import {managersActionTypes} from "../../types/managers";
import {
    getRoleManager,
    getRoleManagerExpanded
} from '../../api/user';

const {
    FETCH_MANAGERS,
    FETCH_MANAGERS_SUCCESS,
    FETCH_MANAGERS_ERROR
} = managersActionTypes;

export const fetchRoleManager = (params) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_MANAGERS
            });
            
            setTimeout(() => {
                getRoleManager(params)
                    .then(res => dispatch({
                        type: FETCH_MANAGERS_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log(err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_MANAGERS_ERROR,
                payload: 'Ошибка при загрузке менеджеров!'
            });
        }
    }
}

export const fetchRoleManagerExpanded = (params) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_MANAGERS
            });
            
            setTimeout(() => {
                getRoleManagerExpanded(params)
                    .then(res => dispatch({
                        type: FETCH_MANAGERS_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log(err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_MANAGERS_ERROR,
                payload: 'Ошибка при загрузке менеджеров!'
            });
        }
    }
}

