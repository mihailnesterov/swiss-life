
import {userActionTypes} from "../../types/user";
import {
    getUserAuthorized,
    getUserAuthorizedExpanded,
    getUsers, 
    getUsersExpanded, 
    getUserExpanded, 
    getUser
} from '../../api/user';

const {
    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR
} = userActionTypes;

export const fetchUsers = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_USER
            });
            
            setTimeout(() => {
                getUsers()
                    .then(res => dispatch({
                        type: FETCH_USER_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log(err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_USER_ERROR,
                payload: 'Ошибка при загрузке пользователей!'
            });
        }
    }
}

export const fetchUsersExpanded = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_USER
            });
            
            setTimeout(() => {
                getUsersExpanded()
                    .then(res => dispatch({
                        type: FETCH_USER_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log(err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_USER_ERROR,
                payload: 'Ошибка при загрузке пользователей!'
            });
        }
    }
}

export const fetchUser = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_USER
            });
            
            setTimeout(() => {
                getUser(id)
                    .then(res => dispatch({
                        type: FETCH_USER_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log(err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_USER_ERROR,
                payload: 'Ошибка при загрузке пользователя!'
            });
        }
    }
}

export const fetchUserExpanded = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_USER
            });
            
            setTimeout(() => {
                getUserExpanded(id)
                    .then(res => dispatch({
                        type: FETCH_USER_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log(err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_USER_ERROR,
                payload: 'Ошибка при загрузке пользователя!'
            });
        }
    }
}

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