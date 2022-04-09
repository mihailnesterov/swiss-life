// Asset Files API
import API, {setHeaders, credentials} from './index';

const URL = `/asset-files`;

export const getAssetFiles = async (params) => 
    await API.get(URL, { credentials, setHeaders, params });

export const getAssetFile = async (id) => 
    await API.get(`${URL}/${id}`, { credentials, setHeaders });

export const createAssetFile = async (params) => 
    await API.post(URL, params, { credentials, setHeaders });

export const updateAssetFile = async (id, params) => 
    await API.put(`${URL}/${id}`, params, { credentials, setHeaders });

export const deleteAssetFile = async (id) => 
    await API.delete(`${URL}/${id}`, { credentials, setHeaders });
