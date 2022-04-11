// File API
import API, {setHeaders, credentials} from './index';

const URL = `/files`;

export const getFiles = async (params) => 
    await API.get(URL, { credentials, setHeaders, params });

export const getFile = async (id) => 
    await API.get(`${URL}/${id}`, { credentials, setHeaders });

export const createFile = async (params) => 
    await API.post(URL, params, { credentials, setHeaders });

export const updateFile = async (id, params) => 
    await API.put(`${URL}/${id}`, params, { credentials, setHeaders });

export const deleteFile = async (id) => 
    await API.delete(`${URL}/${id}`, { credentials, setHeaders });

export const uploadFile = async (params) => 
    await API.post(`${URL}/upload`, params, { credentials, setHeaders });

export const createFolder = async () => 
    await API.get(`${URL}/create_folder`, { credentials, setHeaders });