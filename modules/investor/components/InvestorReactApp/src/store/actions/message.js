
import {messageActionTypes} from "../../types/message";
import {getMessages} from '../../api/message';

const {
    FETCH_MESSAGE,
    FETCH_MESSAGE_SUCCESS,
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
                    .catch(err => console.log('dispatch messages error', err));
            }, 100);
            
        } catch (error) {
            dispatch({
                type: FETCH_MESSAGE_ERROR,
                payload: 'Ошибка при загрузке списка сообщений!'
            });
        }
    }
}
