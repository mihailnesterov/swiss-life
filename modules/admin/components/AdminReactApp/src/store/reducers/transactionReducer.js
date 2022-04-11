import {transactionActionTypes} from '../../types/transaction';

const {
    FETCH_TRANSACTION,
    FETCH_TRANSACTION_SUCCESS,
    FETCH_TRANSACTION_ERROR
} = transactionActionTypes;

const initialState = {
    transactions: [],
    links: {},
    meta: {},
    loading: false,
    error: null
};

export const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRANSACTION:
            return {
                transactions: [],
                links: {},
                meta: {},
                loading: true,
                error: null
            }
        case FETCH_TRANSACTION_SUCCESS:
            return {
                transactions: action.payload.transactions,
                links: action.payload._links,
                meta: action.payload._meta,
                loading: false,
                error: null
            }
        case FETCH_TRANSACTION_ERROR:
            return {
                transactions: [],
                links: {},
                meta: {},
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}