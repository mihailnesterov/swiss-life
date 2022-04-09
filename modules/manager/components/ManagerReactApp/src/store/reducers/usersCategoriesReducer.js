import {usersCategoriesActionTypes} from '../../types/usersCategories';

const {
    FETCH_USERS_CATEGORIES,
    FETCH_USERS_CATEGORIES_SUCCESS,
    FETCH_USERS_CATEGORIES_ERROR
} = usersCategoriesActionTypes;

const initialState = {
    usersCategories: [],
    loading: false,
    error: null
};

export const usersCategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_CATEGORIES:
            return {
                usersCategories: [],
                loading: true,
                error: null
            }
        case FETCH_USERS_CATEGORIES_SUCCESS:
            return {
                usersCategories: action.payload,
                loading: false,
                error: null
            }
        case FETCH_USERS_CATEGORIES_ERROR:
            return {
                usersCategories: [],
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}