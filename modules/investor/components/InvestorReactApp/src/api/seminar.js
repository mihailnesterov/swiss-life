// Seminar API
import API, {setHeaders, credentials} from './index';

const URL = `/seminars`;

export const getSeminars = async (params) => 
    await API.get(URL, { credentials, setHeaders, params });
