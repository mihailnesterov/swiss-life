// Partner API
import API, {setHeaders, credentials} from './index';

const URL = `/partners`;

export const getPartners = async (params) => 
    await API.get(URL, { credentials, setHeaders, params });

export const getPartner = async (id) => 
    await API.get(`${URL}/${id}`, { credentials, setHeaders });

export const createPartner = async (params) => 
    await API.post(URL, params, { credentials, setHeaders });

export const updatePartner = async (id, params) => 
    await API.put(`${URL}/${id}`, params, { credentials, setHeaders });

export const deletePartner = async (id) => 
    await API.delete(`${URL}/${id}`, { credentials, setHeaders });