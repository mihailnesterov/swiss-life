// Transaction API
import API, {setHeaders, credentials} from './index';

const URL = `/transactions`;

export const getTransactions = async (params) => 
    await API.get(URL, { credentials, setHeaders, params });

export const getTransaction = async (id) => 
    await API.get(`${URL}/${id}`, { credentials, setHeaders });
    
export const getUserTransactions = async (user_id, params) => 
    await API.get(`${URL}/user/${user_id}`, { credentials, setHeaders, params });