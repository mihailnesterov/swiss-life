// Contract API
import API, {setHeaders, credentials} from './index';

const URL = `/contracts`;

export const getContracts = async (params) => 
    await API.get(URL, { credentials, setHeaders, params });

export const getContract = async (id) => 
    await API.get(`${URL}/${id}`, { credentials, setHeaders });

export const createContract = async (params) => 
    await API.post(URL, params, { credentials, setHeaders });

export const updateContract = async (id, params) => 
    await API.put(`${URL}/${id}`, params, { credentials, setHeaders });

export const deleteContract = async (id) => 
    await API.delete(`${URL}/${id}`, { credentials, setHeaders });

export const setContractFile = async (params) => 
    await API.put(`${URL}/update_file`, params, { credentials, setHeaders });