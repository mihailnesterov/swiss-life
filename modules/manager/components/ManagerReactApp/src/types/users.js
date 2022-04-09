import Enum from '../utils/enum';

export const usersActionTypes = Enum({
    FETCH_USERS: 'FETCH_USERS',
    FETCH_USERS_SUCCESS: 'FETCH_USERS_SUCCESS',
    FETCH_USER_ITEM_SUCCESS: 'FETCH_USER_ITEM_SUCCESS',
    FETCH_USERS_ERROR: 'FETCH_USERS_ERROR'
});