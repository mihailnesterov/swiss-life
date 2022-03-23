// Contract API
import API, {setHeaders, credentials} from './index';

const URL = `/contracts`;

export const getContracts = async (params) => 
    await API.get(URL, { credentials, setHeaders, params });

export const getContract = async (id) => 
    await API.get(`${URL}/${id}`, { credentials, setHeaders });