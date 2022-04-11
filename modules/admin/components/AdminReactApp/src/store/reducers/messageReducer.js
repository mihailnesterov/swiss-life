import {messageActionTypes} from '../../types/message';

const {
    FETCH_MESSAGE,
    FETCH_MESSAGE_SUCCESS,
    FETCH_MESSAGE_ERROR
} = messageActionTypes;

const initialState = {
    messages: [],
    links: {},
    meta: {},
    loading: false,
    error: null
};

export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MESSAGE:
            return {
                messages: [],
                links: {},
                meta: {},
                loading: true,
                error: null
            }
        case FETCH_MESSAGE_SUCCESS:
            return {
                messages: action.payload.messages,
                links: action.payload._links,
                meta: action.payload._meta,
                loading: false,
                error: null
            }
        case FETCH_MESSAGE_ERROR:
            return {
                messages: [],
                links: {},
                meta: {},
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}