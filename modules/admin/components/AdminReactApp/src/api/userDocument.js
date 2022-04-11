// User Documents API
import API, {setHeaders, credentials} from './index';

const URL = `/user-documents`;

export const getUserDocuments = async (params) => 
    await API.get(URL, { credentials, setHeaders, params });

export const getUserDocument = async (id) => 
    await API.get(`${URL}/${id}`, { credentials, setHeaders });

export const createUserDocument = async (params) => 
    await API.post(URL, params, { credentials, setHeaders });

export const updateUserDocument = async (id, params) => 
    await API.put(`${URL}/${id}`, params, { credentials, setHeaders });

export const deleteUserDocument = async (id) => 
    await API.delete(`${URL}/${id}`, { credentials, setHeaders });
