// User API
import API, {setHeaders, credentials} from './index';

const URL = `/users`;
const EXPAND = `expand=userAssets,manager,accounts,userDocuments,userPhotos,messages,userCategories`;

export const getUserAuthorized = async () => 
    await API.get(`${URL}/authorized`, { credentials, setHeaders });

export const getUserAuthorizedExpanded = async (id) => 
    await API.get(`${URL}/authorized?${EXPAND}`, { credentials, setHeaders });

export const getUsers = async (params) => 
    await API.get(URL, { credentials, setHeaders, params });

export const getUsersExpanded = async (params) => 
    await API.get(`${URL}?${EXPAND}`, { credentials, setHeaders, params });

export const getUser = async (id) => 
    await API.get(`${URL}/${id}`, { credentials, setHeaders });

export const getUserExpanded = async (id) => 
    await API.get(`${URL}/${id}?${EXPAND}`, { credentials, setHeaders });