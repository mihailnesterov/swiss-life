// Company API
import API, {setHeaders, credentials} from './index';

const URL = `/companies`;
const EXPAND = `expand=assets,partners`;

export const getCompany = async () => 
    await API.get(URL, { credentials, setHeaders });

export const getCompanyExpanded = async () => 
    await API.get(`${URL}?${EXPAND}`, { credentials, setHeaders });

export const updateCompany = async (id, params) => 
    await API.put(`${URL}/${id}`, params, { credentials, setHeaders });