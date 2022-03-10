// News API
import API, {setHeaders, credentials} from './index';

const URL = `/news`;

export const getNews = async (params) => 
    await API.get(URL, { credentials, setHeaders, params });

export const getNewsById = async (id) => 
    await API.get(`${URL}/${id}`, { credentials, setHeaders });