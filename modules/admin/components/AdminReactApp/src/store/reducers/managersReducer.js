import {managersActionTypes} from '../../types/managers';

const {
    FETCH_MANAGERS,
    FETCH_MANAGERS_SUCCESS,
    FETCH_MANAGERS_ERROR
} = managersActionTypes;

const initialState = {
    managers: [],
    links: {},
    meta: {},
    loading: false,
    error: null
};

export const managersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MANAGERS:
            return {
                managers: [],
                links: {},
                meta: {},
                loading: true,
                error: null
            }
        case FETCH_MANAGERS_SUCCESS:
            return {
                managers: action.payload.users,
                links: action.payload._links,
                meta: action.payload._meta,
                loading: false,
                error: null
            }
        case FETCH_MANAGERS_ERROR:
            return {
                managers: [],
                links: {},
                meta: {},
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}