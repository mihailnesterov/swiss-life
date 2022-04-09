
import {companyActionTypes} from "../../types/company";
import {getCompany} from '../../api/company';

const {
    FETCH_COMPANY,
    FETCH_COMPANY_SUCCESS,
    FETCH_COMPANY_ERROR
} = companyActionTypes;

export const fetchCompany = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_COMPANY
            });
            
            setTimeout(() => {
                getCompany()
                    .then(res => dispatch({
                        type: FETCH_COMPANY_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log('dispatch company error', err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_COMPANY_ERROR,
                payload: 'Ошибка при загрузке данных компании!'
            });
        }
    }
}
