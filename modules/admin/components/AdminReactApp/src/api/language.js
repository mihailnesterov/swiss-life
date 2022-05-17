// Language API
import API, {setHeaders, credentials} from './index';

const URL = `/languages`;

export const getLanguages = async () => 
    await API.get(URL, { credentials, setHeaders });