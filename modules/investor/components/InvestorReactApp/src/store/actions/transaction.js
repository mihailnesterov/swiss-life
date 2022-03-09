
import {transactionActionTypes} from "../../types/transaction";
import {
    getTransactions,
    getTransaction,
    getUserTransactions
} from '../../api/transaction';

const {
    FETCH_TRANSACTION,
    FETCH_TRANSACTION_SUCCESS,
    FETCH_TRANSACTION_ERROR
} = transactionActionTypes;

export const fetchTransactions = (params) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_TRANSACTION
            });
            
            setTimeout(() => {
                getTransactions(params)
                    .then(res => dispatch({
                        type: FETCH_TRANSACTION_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log('dispatch transactions error', err));
            }, 100);

        } catch (error) {
            dispatch({
                type: FETCH_TRANSACTION_ERROR,
                payload: 'Ошибка при загрузке списка транзакций!'
            });
        }
    }
}


export const fetchTransaction = (id, params) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_TRANSACTION
            });
            
            setTimeout(() => {
                getTransaction(id, params)
                    .then(res => dispatch({
                        type: FETCH_TRANSACTION_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log('dispatch transaction error', err));
            }, 100);

        } catch (error) {
            dispatch({
                type: FETCH_TRANSACTION_ERROR,
                payload: 'Ошибка при загрузке транзакции!'
            });
        }
    }
}

export const fetchUserTransactions = (user_id, params) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_TRANSACTION
            });
            
            setTimeout(() => {
                getUserTransactions(user_id, params)
                    .then(res => dispatch({
                        type: FETCH_TRANSACTION_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log('dispatch user transactions error', err));
            }, 100);

        } catch (error) {
            dispatch({
                type: FETCH_TRANSACTION_ERROR,
                payload: 'Ошибка при загрузке списка транзакций пользователя!'
            });
        }
    }
}
