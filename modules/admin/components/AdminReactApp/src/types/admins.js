import Enum from '../utils/enum';

export const adminsActionTypes = Enum({
    FETCH_ADMINS: 'FETCH_ADMINS',
    FETCH_ADMINS_SUCCESS: 'FETCH_ADMINS_SUCCESS',
    FETCH_ADMINS_ERROR: 'FETCH_ADMINS_ERROR'
});