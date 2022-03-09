
import {newsActionTypes} from "../../types/news";
import {
    getNews,
    getNewsById,
    getNewsExpanded,
    getNewsByIdExpanded
} from '../../api/news';

const {
    FETCH_NEWS,
    FETCH_NEWS_SUCCESS,
    FETCH_NEWS_ERROR
} = newsActionTypes;

export const fetchNews = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_NEWS
            });
            
            setTimeout(() => {
                getNews()
                    .then(res => dispatch({
                        type: FETCH_NEWS_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log('dispatch news error', err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_NEWS_ERROR,
                payload: 'Ошибка при загрузке списка новостей!'
            });
        }
    }
}

export const fetchNewsExpanded = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_NEWS
            });
            
            setTimeout(() => {
                getNewsExpanded()
                    .then(res => dispatch({
                        type: FETCH_NEWS_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log('dispatch news expanded error', err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_NEWS_ERROR,
                payload: 'Ошибка при загрузке списка новостей!'
            });
        }
    }
}

export const fetchNewsById = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_NEWS
            });
            
            setTimeout(() => {
                getNewsById(id)
                    .then(res => dispatch({
                        type: FETCH_NEWS_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log('dispatch news by id error', err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_NEWS_ERROR,
                payload: 'Ошибка при загрузке новости!'
            });
        }
    }
}

export const fetchNewsByIdExpanded = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FETCH_NEWS
            });
            
            setTimeout(() => {
                getNewsByIdExpanded(id)
                    .then(res => dispatch({
                        type: FETCH_NEWS_SUCCESS,
                        payload: res.data
                    }))
                    .catch(err => console.log('dispatch news by id expanded error', err));
            }, 100);
            

        } catch (error) {
            dispatch({
                type: FETCH_NEWS_ERROR,
                payload: 'Ошибка при загрузке новости!'
            });
        }
    }
}
