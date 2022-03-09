import Enum from '../utils/enum';

export const newsActionTypes = Enum({
    FETCH_NEWS: 'FETCH_NEWS',
    FETCH_NEWS_SUCCESS: 'FETCH_NEWS_SUCCESS',
    FETCH_NEWS_ERROR: 'FETCH_NEWS_ERROR'
});