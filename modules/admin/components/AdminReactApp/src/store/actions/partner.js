
import {partnerActionTypes} from "../../types/partner";
import {getPartners, getPartner} from '../../api/partner';

const {
    FETCH_PARTNER,
    FETCH_PARTNER_SUCCESS,
    FETCH_PARTNER_ERROR
} = partnerActionTypes;

export const fetchPartners = (params) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_PARTNER
            });
            
            setTimeout(() => {
                getPartners(params)
                    .then(res => dispatch({
                        type: FETCH_PARTNER_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log('dispatch partners error', err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_PARTNER_ERROR,
                payload: 'Ошибка при загрузке списка партнеров!'
            });
        }
    }
}

export const fetchPartner = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_PARTNER
            });
            
            setTimeout(() => {
                getPartner(id)
                    .then(res => dispatch({
                        type: FETCH_PARTNER_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log('dispatch partner error', err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_PARTNER_ERROR,
                payload: 'Ошибка при загрузке партнера!'
            });
        }
    }
}
