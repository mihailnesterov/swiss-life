// Partner API
import API, {setHeaders, credentials} from './index';

const URL = `/partners`;

/**
 * Get partners
 * @returns 
 */
export const getPartners = async () => 
    await API.get(URL, { credentials, setHeaders });

/**
 * Get partner by id
 * @returns 
 */
export const getPartner = async (id) => 
    await API.get(`${URL}/${id}`, { credentials, setHeaders });