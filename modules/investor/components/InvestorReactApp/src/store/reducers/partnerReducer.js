import {partnerActionTypes} from '../../types/partner';

const {
    FETCH_PARTNER,
    FETCH_PARTNER_SUCCESS,
    FETCH_PARTNER_ERROR
} = partnerActionTypes;

const initialState = {
    partners: [],
    loading: false,
    error: null
};

export const partnerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PARTNER:
            return {
                partners: [],
                loading: true,
                error: null
            }
        case FETCH_PARTNER_SUCCESS:
            return {
                partners: action.payload,
                loading: false,
                error: null
            }
        case FETCH_PARTNER_ERROR:
            return {
                partners: [],
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}