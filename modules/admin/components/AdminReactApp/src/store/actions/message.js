
import {messageActionTypes} from '../../types/message';

import {
    getMessages,
    getNewMessages
} from '../../api/message';

const {
    FETCH_MESSAGE,
    FETCH_MESSAGE_SUCCESS,
    FETCH_NEW_MESSAGES_COUNT_SUCCESS,
    FETCH_MESSAGE_ERROR
} = messageActionTypes;

export const fetchMessages = (params) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_MESSAGE
            });
            
            setTimeout(() => {
                getMessages(params)
                    .then(res => dispatch({
                        type: FETCH_MESSAGE_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log(err));
            }, 100);

        } catch (error) {
            dispatch({
                type: FETCH_MESSAGE_ERROR,
                payload: 'Ошибка при загрузке сообщений!'
            });
        }
    }
}

export const fetchNewMessagesCount = (params) => {
    return async (dispatch) => {
        try {
            
            setTimeout(() => {
                getNewMessages(params)
                    .then(res => dispatch({
                        type: FETCH_NEW_MESSAGES_COUNT_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log(err));
            }, 100);
            

        } catch (error) {
            console.log('Ошибка при загрузке количества новых сообщений!', error);
        }
    }
}