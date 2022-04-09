// Message API
import API, {setHeaders, credentials} from './index';

const URL = `/messages`;

export const getMessages= async (params) => 
    await API.get(URL, { credentials, setHeaders, params });

export const getSernderMessages= async (id, params) => 
    await API.get(`${URL}/sender/${id}`, { credentials, setHeaders, params });

export const getReceiverMessages= async (id, params) => 
    await API.get(`${URL}/receiver/${id}`, { credentials, setHeaders, params });

export const createMessage = async (params) => 
    await API.post(URL, params, { credentials, setHeaders });
 
 export const updateMessage = async (id, params) => 
    await API.put(`${URL}/${id}`, params, { credentials, setHeaders });
 
 export const deleteMessage = async (id) => 
    await API.delete(`${URL}/${id}`, { credentials, setHeaders });