import {partnerActionTypes} from '../../types/partner';

const {
    FETCH_PARTNER,
    FETCH_PARTNER_SUCCESS,
    FETCH_PARTNER_ERROR
} = partnerActionTypes;

const initialState = {
    partners: [],
    links: {},
    meta: {},
    loading: false,
    error: null
};

export const partnerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PARTNER:
            return {
                partners: [],
                links: {},
                meta: {},
                loading: true,
                error: null
            }
        case FETCH_PARTNER_SUCCESS:
            return {
                partners: action.payload.partners,
                links: action.payload._links,
                meta: action.payload._meta,
                loading: false,
                error: null
            }
        case FETCH_PARTNER_ERROR:
            return {
                partners: [],
                links: {},
                meta: {},
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}