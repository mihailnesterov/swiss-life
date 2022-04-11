import axios from 'axios';
import {getToken} from './token';

// get base url from process.env
const getBaseUrl = () => {
    return process.env.NODE_ENV === 'development' ? 
            process.env.REACT_APP_ADMIN_DEV_URL :
            process.env.REACT_APP_ADMIN_PROD_URL;
}

// get REST API url from process.env
const getApiUrl = () => {
    return process.env.NODE_ENV === 'development' ? 
            process.env.REACT_APP_ADMIN_API_DEV_URL :
            process.env.REACT_APP_ADMIN_API_PROD_URL;
}

// create headers and append what we need...
export const setHeaders = () => {
    const headers = new Headers();
    appendBearerTokenToHeaders(headers);
}

// set auth bearer token
const appendBearerTokenToHeaders = (headers) => {
    headers.append('Authorization', `Bearer ${getToken()}`);
}

export const BASE_URL = getBaseUrl();
export const API_URL = getApiUrl();
export const credentials = 'include';

export default axios.create({
    baseURL: API_URL
});