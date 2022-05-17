import Enum from '../utils/enum';

export const languageActionTypes = Enum({
    FETCH_LANGUAGE: 'FETCH_LANGUAGE',
    FETCH_LANGUAGE_SUCCESS: 'FETCH_LANGUAGE_SUCCESS',
    FETCH_LANGUAGE_ERROR: 'FETCH_LANGUAGE_ERROR'
});