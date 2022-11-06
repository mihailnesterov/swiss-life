import {mobileMenuActionTypes} from '../../types/mobileMenu';

const {
    FETCH_MOBILE_MENU_OPEN,
    FETCH_MOBILE_MENU_CLOSE
} = mobileMenuActionTypes;

export const setMobileMenuOpen = () => {
    return async (dispatch) => {
        dispatch({
            type: FETCH_MOBILE_MENU_OPEN
        });
    }
}

export const setMobileMenuClose = () => {
    return async (dispatch) => {
        dispatch({
            type: FETCH_MOBILE_MENU_CLOSE
        });
    }
}
