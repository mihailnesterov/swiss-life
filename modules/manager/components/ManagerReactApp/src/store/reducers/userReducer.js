import {userActionTypes} from '../../types/user';

const {
    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR
} = userActionTypes;

const initialState = {
    user: [],
    loading: false,
    error: null
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER:
            return {
                user: [],
                loading: true,
                error: null
            }
        case FETCH_USER_SUCCESS:
            return {
                user: action.payload,
                loading: false,
                error: null
            }
        case FETCH_USER_ERROR:
            return {
                user: [],
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}