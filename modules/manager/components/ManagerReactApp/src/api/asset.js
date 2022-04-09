// Asset API
import API, {setHeaders, credentials} from './index';

const URL = `/assets`;

export const getAssets = async (params) => 
    await API.get(URL, { credentials, setHeaders, params });

export const getAsset = async (id) => 
    await API.get(`${URL}/${id}`, { credentials, setHeaders });
    
export const getAssetsCategories = async () => 
    await API.get(`${URL}/categories`, { credentials, setHeaders });

export const createAsset = async (params) => 
    await API.post(URL, params, { credentials, setHeaders });

export const updateAsset = async (id, params) => 
    await API.put(`${URL}/${id}`, params, { credentials, setHeaders });

export const deleteAsset = async (id) => 
    await API.delete(`${URL}/${id}`, { credentials, setHeaders });

export const setAssetPhoto = async (params) => 
    await API.put(`${URL}/update_photo`, params, { credentials, setHeaders });