
import {seminarActionTypes} from "../../types/seminar";
import {getSeminars} from '../../api/seminar';

const {
    FETCH_SEMINAR,
    FETCH_SEMINAR_SUCCESS,
    FETCH_SEMINAR_ERROR
} = seminarActionTypes;

export const fetchSeminars = (params) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_SEMINAR
            });
            
            setTimeout(() => {
                getSeminars(params)
                    .then(res => dispatch({
                        type: FETCH_SEMINAR_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log('dispatch seminars error', err));
            }, 100);
            
        } catch (error) {
            dispatch({
                type: FETCH_SEMINAR_ERROR,
                payload: 'Ошибка при загрузке списка семинаров!'
            });
        }
    }
}
