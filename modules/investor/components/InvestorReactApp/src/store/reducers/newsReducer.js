import {newsActionTypes} from '../../types/news';

const {
    FETCH_NEWS,
    FETCH_NEWS_SUCCESS,
    FETCH_NEWS_ERROR
} = newsActionTypes;

const initialState = {
    news: [],
    loading: false,
    error: null
};

export const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NEWS:
            return {
                news: [],
                loading: true,
                error: null
            }
        case FETCH_NEWS_SUCCESS:
            return {
                news: action.payload,
                loading: false,
                error: null
            }
        case FETCH_NEWS_ERROR:
            return {
                news: [],
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}