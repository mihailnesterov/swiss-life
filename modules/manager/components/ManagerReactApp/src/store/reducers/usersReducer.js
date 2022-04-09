import {usersActionTypes} from '../../types/users';

const {
    FETCH_USERS,
    FETCH_USERS_SUCCESS,
    FETCH_USER_ITEM_SUCCESS,
    FETCH_USERS_ERROR
} = usersActionTypes;

const initialState = {
    users: [],
    links: {},
    meta: {},
    loading: false,
    error: null
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return {
                users: [],
                links: {},
                meta: {},
                loading: true,
                error: null
            }
        case FETCH_USERS_SUCCESS:
            return {
                users: action.payload.users,
                links: action.payload._links,
                meta: action.payload._meta,
                loading: false,
                error: null
            }
        case FETCH_USER_ITEM_SUCCESS:
            return {
                users: [action.payload],
                links: {},
                meta: {},
                loading: false,
                error: null
            }
        case FETCH_USERS_ERROR:
            return {
                users: [],
                links: {},
                meta: {},
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}