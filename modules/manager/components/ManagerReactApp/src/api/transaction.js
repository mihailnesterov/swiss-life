// Transaction API
import API, {setHeaders, credentials} from './index';

const URL = `/transactions`;

export const getTransactions = async (params) => 
    await API.get(URL, { credentials, setHeaders, params });

export const getTransaction = async (id) => 
    await API.get(`${URL}/${id}`, { credentials, setHeaders });

export const getUserTransactions = async (user_id, params) => 
    await API.get(`${URL}/user/${user_id}`, { credentials, setHeaders, params });
    
export const getManagerTransactions = async (manager_id, params) => 
    await API.get(`${URL}/manager/${manager_id}`, { credentials, setHeaders, params });

export const getManagerAuthorizedTransactions = async (params) => 
    await API.get(`${URL}/manager_authorized`, { credentials, setHeaders, params });

export const createTransaction = async (params) => 
    await API.post(URL, params, { credentials, setHeaders });

export const updateTransaction = async (id, params) => 
    await API.put(`${URL}/${id}`, params, { credentials, setHeaders });

export const deleteTransaction = async (id) => 
    await API.delete(`${URL}/${id}`, { credentials, setHeaders });