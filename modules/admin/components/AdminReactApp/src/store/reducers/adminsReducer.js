import {adminsActionTypes} from '../../types/admins';

const {
    FETCH_ADMINS,
    FETCH_ADMINS_SUCCESS,
    FETCH_ADMINS_ERROR
} = adminsActionTypes;

const initialState = {
    admins: [],
    links: {},
    meta: {},
    loading: false,
    error: null
};

export const adminsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ADMINS:
            return {
                admins: [],
                links: {},
                meta: {},
                loading: true,
                error: null
            }
        case FETCH_ADMINS_SUCCESS:
            return {
                admins: action.payload.users,
                links: action.payload._links,
                meta: action.payload._meta,
                loading: false,
                error: null
            }
        case FETCH_ADMINS_ERROR:
            return {
                admins: [],
                links: {},
                meta: {},
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}