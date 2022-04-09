import {companyActionTypes} from '../../types/company';

const {
    FETCH_COMPANY,
    FETCH_COMPANY_SUCCESS,
    FETCH_COMPANY_ERROR
} = companyActionTypes;

const initialState = {
    company: [],
    loading: false,
    error: null
};

export const companyReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COMPANY:
            return {
                company: [],
                loading: true,
                error: null
            }
        case FETCH_COMPANY_SUCCESS:
            return {
                company: action.payload,
                loading: false,
                error: null
            }
        case FETCH_COMPANY_ERROR:
            return {
                company: [],
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}