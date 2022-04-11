// News API
import API, {setHeaders, credentials} from './index';

const URL = `/news`;

export const getNews = async (params) => 
    await API.get(URL, { credentials, setHeaders, params });

export const getNewsById = async (id) => 
    await API.get(`${URL}/${id}`, { credentials, setHeaders });

export const createNews = async (params) => 
    await API.post(URL, params, { credentials, setHeaders });

export const updateNews = async (id, params) => 
    await API.put(`${URL}/${id}`, params, { credentials, setHeaders });

export const deleteNews = async (id) => 
    await API.delete(`${URL}/${id}`, { credentials, setHeaders });

export const setNewsPhoto = async (params) => 
    await API.put(`${URL}/update_photo`, params, { credentials, setHeaders });