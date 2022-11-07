// Seminar API
import API, {setHeaders, credentials} from './index';

const URL = `/seminars`;

export const getSeminars = async (params) => 
    await API.get(URL, { credentials, setHeaders, params });

export const getSeminar = async (id) => 
    await API.get(`${URL}/${id}`, { credentials, setHeaders });

export const createSeminar = async (params) => 
    await API.post(URL, params, { credentials, setHeaders });

export const updateSeminar = async (id, params) => 
    await API.put(`${URL}/${id}`, params, { credentials, setHeaders });

export const deleteSeminar = async (id) => 
    await API.delete(`${URL}/${id}`, { credentials, setHeaders });

export const setSeminarFile = async (params) => 
    await API.put(`${URL}/update_file`, params, { credentials, setHeaders });