// News API
import API, {setHeaders, credentials} from './index';

const URL = `/news`;
const EXPAND = `expand=newsFiles`;

export const getNews = async (params) => 
    await API.get(URL, { credentials, setHeaders, params });

export const getNewsExpanded = async (params) => 
    await API.get(`${URL}?${EXPAND}`, { credentials, setHeaders, params });

export const getNewsById = async (id) => 
    await API.get(`${URL}/${id}`, { credentials, setHeaders });

export const getNewsByIdExpanded = async (id) => 
    await API.get(`${URL}/${id}?${EXPAND}`, { credentials, setHeaders });