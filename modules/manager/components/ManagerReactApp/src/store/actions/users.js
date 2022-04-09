
import {usersActionTypes} from "../../types/users";
import {
    getUsers, 
    getUsersExpanded,
    getUsersOfAuthorizedManager,
    getUsersOfAuthorizedManagerExpanded,
    getUser,
    getUserExpanded
} from '../../api/user';

const {
    FETCH_USERS,
    FETCH_USERS_SUCCESS,
    FETCH_USER_ITEM_SUCCESS,
    FETCH_USERS_ERROR
} = usersActionTypes;

export const fetchUsers = (params) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_USERS
            });
            
            setTimeout(() => {
                getUsers(params)
                    .then(res => dispatch({
                        type: FETCH_USERS_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log(err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_USERS_ERROR,
                payload: 'Ошибка при загрузке пользователей!'
            });
        }
    }
}

export const fetchUsersExpanded = (params) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_USERS
            });
            
            setTimeout(() => {
                getUsersExpanded(params)
                    .then(res => dispatch({
                        type: FETCH_USERS_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log(err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_USERS_ERROR,
                payload: 'Ошибка при загрузке пользователей!'
            });
        }
    }
}

export const fetchUsersOfAuthorizedManager = (params) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_USERS
            });
            
            setTimeout(() => {
                getUsersOfAuthorizedManager(params)
                    .then(res => dispatch({
                        type: FETCH_USERS_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log(err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_USERS_ERROR,
                payload: 'Ошибка при загрузке пользователей авторизованного менеджера!'
            });
        }
    }
}

export const fetchUsersOfAuthorizedManagerExpanded = (params) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_USERS
            });
            
            setTimeout(() => {
                getUsersOfAuthorizedManagerExpanded(params)
                    .then(res => dispatch({
                        type: FETCH_USERS_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log(err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_USERS_ERROR,
                payload: 'Ошибка при загрузке пользователей авторизованного менеджера!'
            });
        }
    }
}

export const fetchUser = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_USERS
            });
            
            setTimeout(() => {
                getUser(id)
                    .then(res => dispatch({
                        type: FETCH_USER_ITEM_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log(err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_USERS_ERROR,
                payload: 'Ошибка при загрузке пользователя!'
            });
        }
    }
}

export const fetchUserExpanded = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_USERS
            });
            
            setTimeout(() => {
                getUserExpanded(id)
                    .then(res => dispatch({
                        type: FETCH_USER_ITEM_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log(err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_USERS_ERROR,
                payload: 'Ошибка при загрузке пользователя!'
            });
        }
    }
}