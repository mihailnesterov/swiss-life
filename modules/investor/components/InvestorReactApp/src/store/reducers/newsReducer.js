import {newsActionTypes} from '../../types/news';

const {
    FETCH_NEWS,
    FETCH_NEWS_SUCCESS,
    FETCH_NEWS_ITEM_SUCCESS,
    FETCH_NEWS_ERROR
} = newsActionTypes;

const initialState = {
    news: [],
    links: {},
    meta: {},
    loading: false,
    error: null
};

export const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NEWS:
            return {
                news: [],
                links: {},
                meta: {},
                loading: true,
                error: null
            }
        case FETCH_NEWS_SUCCESS:
            return {
                news: action.payload.news,
                links: action.payload._links,
                meta: action.payload._meta,
                loading: false,
                error: null
            }
        case FETCH_NEWS_ITEM_SUCCESS:
            return {
                news: [action.payload],
                links: {},
                meta: {},
                loading: false,
                error: null
            }
        case FETCH_NEWS_ERROR:
            return {
                news: [],
                links: {},
                meta: {},
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}