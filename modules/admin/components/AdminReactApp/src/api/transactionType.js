// Transaction Types API
import API, {setHeaders, credentials} from './index';

const URL = `/transaction-types`;

export const getTransactionTypes = async (params) => 
    await API.get(URL, { credentials, setHeaders, params });

export const getTransactionType = async (id) => 
    await API.get(`${URL}/${id}`, { credentials, setHeaders });

export const createTransactionType = async (params) => 
    await API.post(URL, params, { credentials, setHeaders });

export const updateTransactionType = async (id, params) => 
    await API.put(`${URL}/${id}`, params, { credentials, setHeaders });

export const deleteTransactionType = async (id) => 
    await API.delete(`${URL}/${id}`, { credentials, setHeaders });