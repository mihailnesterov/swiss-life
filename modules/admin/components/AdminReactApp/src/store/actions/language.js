
import {languageActionTypes} from "../../types/language";
import {getLanguages} from '../../api/language';

const {
    FETCH_LANGUAGE,
    FETCH_LANGUAGE_SUCCESS,
    FETCH_LANGUAGE_ERROR
} = languageActionTypes;

export const fetchLanguages = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_LANGUAGE
            });
            
            setTimeout(() => {
                getLanguages()
                    .then(res => dispatch({
                        type: FETCH_LANGUAGE_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log('dispatch languages error', err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_LANGUAGE_ERROR,
                payload: 'Ошибка при загрузке языков!'
            });
        }
    }
}
