
import {navbarActionTypes} from "../../types/navbar";

const {
    FETCH_NAVBAR_OPEN,
    FETCH_NAVBAR_CLOSE
} = navbarActionTypes;

export const setNavbarOpen = () => {
    return async (dispatch) => {
        dispatch({
            type: FETCH_NAVBAR_OPEN
        });
    }
}

export const setNavbarClose = () => {
    return async (dispatch) => {
        dispatch({
            type: FETCH_NAVBAR_CLOSE
        });
    }
}
