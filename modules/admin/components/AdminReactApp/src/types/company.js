import Enum from '../utils/enum';

export const companyActionTypes = Enum({
    FETCH_COMPANY: 'FETCH_COMPANY',
    FETCH_COMPANY_SUCCESS: 'FETCH_COMPANY_SUCCESS',
    FETCH_COMPANY_ERROR: 'FETCH_COMPANY_ERROR'
});