// Currency API
import API, {setHeaders, credentials} from './index';

const URL = `/currencies`;

export const getCurrencies = async (params) => 
    await API.get(URL, { credentials, setHeaders, params });

export const getCurrency = async (id) => 
    await API.get(`${URL}/${id}`, { credentials, setHeaders });