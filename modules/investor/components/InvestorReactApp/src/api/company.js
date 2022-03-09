// Company API
import API, {setHeaders, credentials} from './index';

const URL = `/companies`;
const EXPAND = `expand=assets,managers,partners`;

/**
 * Get active company
 * @returns 
 */
export const getCompany = async () => 
    await API.get(URL, { credentials, setHeaders });

/**
 * Get active company expanded
 * @returns 
 */
export const getCompanyExpanded = async () => 
    await API.get(`${URL}?${EXPAND}`, { credentials, setHeaders });