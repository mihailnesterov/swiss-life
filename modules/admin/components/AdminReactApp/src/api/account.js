// Account API
import API, {setHeaders, credentials} from './index';

const URL = `/accounts`;
const EXPAND = `expand=user`;

export const getAccounts = async (params) => 
    await API.get(URL, { credentials, setHeaders, params });

export const getAccountsExpanded = async (params) => 
    await API.get(`${URL}?${EXPAND}`, { credentials, setHeaders, params });

export const getAccount = async (id) => 
    await API.get(`${URL}/${id}`, { credentials, setHeaders });

export const getAccountExpanded = async (id) => 
    await API.get(`${URL}/${id}?${EXPAND}`, { credentials, setHeaders });
    
export const createAccount = async (params) => 
    await API.post(URL, params, { credentials, setHeaders });

export const updateAccount = async (id, params) => 
    await API.put(`${URL}/${id}`, params, { credentials, setHeaders });

export const deleteAccount = async (id) => 
    await API.delete(`${URL}/${id}`, { credentials, setHeaders });