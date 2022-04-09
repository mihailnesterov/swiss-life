// User API
import API, {setHeaders, credentials} from './index';

const URL = `/users`;
const EXPAND = `expand=manager,accounts,userDocuments,userPhotos,messagesIn,messagesOut,userCategories,managerTransactions`;

export const getUserAuthorized = async () => 
    await API.get(`${URL}/authorized`, { credentials, setHeaders });

export const getUserAuthorizedExpanded = async () => 
    await API.get(`${URL}/authorized?${EXPAND}`, { credentials, setHeaders });

export const getUsers = async (params) => 
    await API.get(URL, { credentials, setHeaders, params });

export const getUsersExpanded = async (params) => 
    await API.get(`${URL}?${EXPAND}`, { credentials, setHeaders, params });

export const getUser = async (id) => 
    await API.get(`${URL}/${id}`, { credentials, setHeaders });

export const getUserExpanded = async (id) => 
    await API.get(`${URL}/${id}?${EXPAND}`, { credentials, setHeaders });

export const getUserMembers = async (id, params) => 
    await API.get(`${URL}/${id}/members`, { credentials, setHeaders, params });

export const getUserMembersExpanded = async (id, params) => 
    await API.get(`${URL}/${id}/members?${EXPAND}`, { credentials, setHeaders, params });

export const setUserPassword = async (id, params) => 
    await API.put(`${URL}/${id}/change_password`, params, { credentials, setHeaders });

export const getUsersOfAuthorizedManager = async () => 
    await API.get(`${URL}/authorized_manager`, { credentials, setHeaders });

export const getUsersOfAuthorizedManagerExpanded = async (params) => 
    await API.get(`${URL}/authorized_manager?${EXPAND}`, { credentials, setHeaders, params });

export const getUsersVerified = async (params) => 
    await API.get(`${URL}/verified?${EXPAND}`, { credentials, setHeaders, params });

export const getUsersCategories = async () => 
    await API.get(`${URL}/categories`, { credentials, setHeaders });

export const createUser = async (params) => 
    await API.post(URL, params, { credentials, setHeaders });

export const updateUser = async (id, params) => 
    await API.put(`${URL}/${id}`, params, { credentials, setHeaders });

export const deleteUser = async (id) => 
    await API.delete(`${URL}/${id}`, { credentials, setHeaders });

export const setUserPhoto = async (params) => 
    await API.put(`${URL}/update_photo`, params, { credentials, setHeaders });