import {languageActionTypes} from '../../types/language';

const {
    FETCH_LANGUAGE,
    FETCH_LANGUAGE_SUCCESS,
    FETCH_LANGUAGE_ERROR
} = languageActionTypes;

const initialState = {
    languages: [],
    loading: false,
    error: null
};

export const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LANGUAGE:
            return {
                languages: [],
                loading: true,
                error: null
            }
        case FETCH_LANGUAGE_SUCCESS:
            return {
                languages: action.payload,
                loading: false,
                error: null
            }
        case FETCH_LANGUAGE_ERROR:
            return {
                languages: [],
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}