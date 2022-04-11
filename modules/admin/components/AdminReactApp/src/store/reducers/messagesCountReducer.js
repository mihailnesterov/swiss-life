import {messageActionTypes} from '../../types/message';

const {
    FETCH_NEW_MESSAGES_COUNT_SUCCESS
} = messageActionTypes;

const initialState = {
    count: 0
};

export const messagesCountReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NEW_MESSAGES_COUNT_SUCCESS:
            return {
                count: action.payload
            }
        default:
            return state;
    }
}