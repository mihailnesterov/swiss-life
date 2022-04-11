import Enum from '../utils/enum';

export const managersActionTypes = Enum({
    FETCH_MANAGERS: 'FETCH_MANAGERS',
    FETCH_MANAGERS_SUCCESS: 'FETCH_MANAGERS_SUCCESS',
    FETCH_MANAGERS_ERROR: 'FETCH_MANAGERS_ERROR'
});