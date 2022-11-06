import {mobileMenuActionTypes} from '../../types/mobileMenu';

const {
    FETCH_MOBILE_MENU_OPEN,
    FETCH_MOBILE_MENU_CLOSE
} = mobileMenuActionTypes;

const initialState = {
    mobileMenu: false
};

export const mobileMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MOBILE_MENU_OPEN:
            return {
                mobileMenu: true
            }
        case FETCH_MOBILE_MENU_CLOSE:
            return {
                mobileMenu: false
            }
        default:
            return state;
    }
}