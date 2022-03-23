import * as CompanyActionCreators from './company';
import * as UserActionCreators from './user';
import * as PartnerActionCreators from './partner';
import * as AssetActionCreators from './asset';
import * as AssetCategoriesActionCreators from './assetCategories';
import * as NewsActionCreators from './news';
import * as TransactionActionCreators from './transaction';
import * as ContractActionCreators from './contract';
import * as NavbarActionCreators from './navbar';

// собираем вместе все action creators
const ActionCreators = {
    ...CompanyActionCreators,
    ...UserActionCreators,
    ...PartnerActionCreators,
    ...AssetActionCreators,
    ...AssetCategoriesActionCreators,
    ...NewsActionCreators,
    ...TransactionActionCreators,
    ...ContractActionCreators,
    ...NavbarActionCreators
}

export default ActionCreators;