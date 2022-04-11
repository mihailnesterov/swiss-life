
import {contractActionTypes} from "../../types/contract";
import {
    getContracts,
    getContract
} from '../../api/contract';

const {
    FETCH_CONTARCT,
    FETCH_CONTARCT_SUCCESS,
    FETCH_CONTARCT_ERROR
} = contractActionTypes;

export const fetchContracts = (params) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_CONTARCT
            });
            
            setTimeout(() => {
                getContracts(params)
                    .then(res => dispatch({
                        type: FETCH_CONTARCT_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log('dispatch contracts error', err));
            }, 100);
            
        } catch (error) {
            dispatch({
                type: FETCH_CONTARCT_ERROR,
                payload: 'Ошибка при загрузке списка договоров!'
            });
        }
    }
}

export const fetchContract = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_CONTARCT
            });
            
            setTimeout(() => {
                getContract(id)
                    .then(res => dispatch({
                        type: FETCH_CONTARCT_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log('dispatch contract error', err));
            }, 100);

        } catch (error) {
            dispatch({
                type: FETCH_CONTARCT_ERROR,
                payload: 'Ошибка при загрузке договора!'
            });
        }
    }
}
