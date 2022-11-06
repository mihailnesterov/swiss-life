import Enum from '../utils/enum';

export const messageActionTypes = Enum({
    FETCH_MESSAGE: 'FETCH_MESSAGE',
    FETCH_MESSAGE_SUCCESS: 'FETCH_MESSAGE_SUCCESS',
    FETCH_MESSAGE_ERROR: 'FETCH_MESSAGE_ERROR'
});