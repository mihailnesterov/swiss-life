// Asset API
import API, {setHeaders, credentials} from './index';

const URL = `/assets`;

export const getAssets = async (params) => 
    await API.get(URL, { credentials, setHeaders, params });

export const getAsset = async (id) => 
    await API.get(`${URL}/${id}`, { credentials, setHeaders });
    
export const getAssetsCategories = async () => 
    await API.get(`${URL}/categories`, { credentials, setHeaders });