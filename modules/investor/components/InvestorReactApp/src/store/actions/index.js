import * as CompanyActionCreators from './company';
import * as UserActionCreators from './user';
import * as PartnerActionCreators from './partner';
import * as AssetActionCreators from './company';
import * as NewsActionCreators from './news';
import * as TransactionActionCreators from './transaction';

// собираем вместе все action creators
const ActionCreators = {
    ...CompanyActionCreators,
    ...UserActionCreators,
    ...PartnerActionCreators,
    ...AssetActionCreators,
    ...NewsActionCreators,
    ...TransactionActionCreators
}

export default ActionCreators;