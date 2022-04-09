// Status API
import API, {setHeaders, credentials} from './index';

const URL = `/statuses`;

export const getStatuses = async (params) => 
    await API.get(URL, { credentials, setHeaders, params });

export const getStatus = async (id) => 
    await API.get(`${URL}/${id}`, { credentials, setHeaders });