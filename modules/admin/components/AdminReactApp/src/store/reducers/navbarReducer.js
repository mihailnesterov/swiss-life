import {navbarActionTypes} from '../../types/navbar';

const {
    FETCH_NAVBAR_OPEN,
    FETCH_NAVBAR_CLOSE
} = navbarActionTypes;

const initialState = {
    navbar: true
};

export const navbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NAVBAR_OPEN:
            return {
                navbar: true
            }
        case FETCH_NAVBAR_CLOSE:
            return {
                navbar: false
            }
        default:
            return state;
    }
}