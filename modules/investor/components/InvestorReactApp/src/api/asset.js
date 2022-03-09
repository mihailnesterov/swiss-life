// Asset API
import API, {setHeaders, credentials} from './index';

const URL = `/assets`;
const EXPAND = `expand=transactions,currency,user`;

export const getAssets = async (params) => 
    await API.get(URL, { credentials, setHeaders, params });

export const getAssetsExpanded = async (params) => 
    await API.get(`${URL}?${EXPAND}`, { credentials, setHeaders, params });

export const getAsset = async (id) => 
    await API.get(`${URL}/${id}`, { credentials, setHeaders });

export const getAssetExpanded = async (id) => 
    await API.get(`${URL}/${id}?${EXPAND}`, { credentials, setHeaders });
    
export const getAssetsCategories = async () => 
    await API.get(`${URL}/categories`, { credentials, setHeaders });