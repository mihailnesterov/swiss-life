import {contractActionTypes} from '../../types/contract';

const {
    FETCH_CONTARCT,
    FETCH_CONTARCT_SUCCESS,
    FETCH_CONTARCT_ERROR
} = contractActionTypes;

const initialState = {
    contracts: [],
    loading: false,
    error: null
};

export const contractReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CONTARCT:
            return {
                contracts: [],
                loading: true,
                error: null
            }
        case FETCH_CONTARCT_SUCCESS:
            return {
                contracts: action.payload,
                loading: false,
                error: null
            }
        case FETCH_CONTARCT_ERROR:
            return {
                contracts: [],
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}