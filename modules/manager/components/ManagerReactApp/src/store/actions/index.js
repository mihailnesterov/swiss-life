import * as CompanyActionCreators from './company';
import * as UserActionCreators from './user';
import * as UsersActionCreators from './users';
import * as UsersCategoriesActionCreators from './usersCategories';
import * as PartnerActionCreators from './partner';
import * as AssetActionCreators from './asset';
import * as AssetCategoriesActionCreators from './assetCategories';
import * as NewsActionCreators from './news';
import * as TransactionActionCreators from './transaction';
import * as ContractActionCreators from './contract';
import * as NavbarActionCreators from './navbar';
import * as LanguagesActionCreators from './language';
import * as SeminarsActionCreators from './seminar';

// собираем вместе все action creators
const ActionCreators = {
    ...CompanyActionCreators,
    ...UserActionCreators,
    ...UsersActionCreators,
    ...UsersCategoriesActionCreators,
    ...PartnerActionCreators,
    ...AssetActionCreators,
    ...AssetCategoriesActionCreators,
    ...NewsActionCreators,
    ...TransactionActionCreators,
    ...ContractActionCreators,
    ...NavbarActionCreators,
    ...LanguagesActionCreators,
    ...SeminarsActionCreators
}

export default ActionCreators;