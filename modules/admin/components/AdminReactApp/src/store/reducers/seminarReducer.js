import {seminarActionTypes} from '../../types/seminar';

const {
    FETCH_SEMINAR,
    FETCH_SEMINAR_SUCCESS,
    FETCH_SEMINAR_ERROR
} = seminarActionTypes;

const initialState = {
    seminars: [],
    links: {},
    meta: {},
    loading: false,
    error: null
};

export const seminarReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SEMINAR:
            return {
                seminars: [],
                links: {},
                meta: {},
                loading: true,
                error: null
            }
        case FETCH_SEMINAR_SUCCESS:
            return {
                seminars: action.payload.seminars,
                links: action.payload._links,
                meta: action.payload._meta,
                loading: false,
                error: null
            }
        case FETCH_SEMINAR_ERROR:
            return {
                seminars: [],
                links: {},
                meta: {},
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}