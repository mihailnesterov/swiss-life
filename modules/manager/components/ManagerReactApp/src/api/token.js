// Bearer Token API
import API from './index';

const URL = `/users/token`;

export const getToken = () => {
    
    let token = getToketFromLocalStorage();

    if (!token) {
        getUserToken()
            .then(res => {
                token = res.data;
                setToketToLocalStorage(token);
            })
            .catch(err => console.log(err));
    }
    
    return token;
}

const getUserToken = async () => await API.get(URL);
const setToketToLocalStorage = (token) => localStorage.setItem('swiss-life-token', token);
const getToketFromLocalStorage = () => localStorage.getItem('swiss-life-token');