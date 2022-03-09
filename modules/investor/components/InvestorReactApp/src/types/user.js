import Enum from '../utils/enum';

export const userActionTypes = Enum({
    FETCH_USER: 'FETCH_USER',
    FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
    FETCH_USER_ERROR: 'FETCH_USER_ERROR'
});