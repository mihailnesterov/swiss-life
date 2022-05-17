import { combineReducers } from "redux";
import { companyReducer } from "./companyReducer";
import { userReducer } from "./userReducer";
import { usersReducer } from "./usersReducer";
import { usersCategoriesReducer } from "./usersCategoriesReducer";
import { partnerReducer } from "./partnerReducer";
import { assetReducer } from "./assetReducer";
import { assetCategoriesReducer } from "./assetCategoriesReducer";
import { newsReducer } from "./newsReducer";
import { transactionReducer } from "./transactionReducer";
import { contractReducer } from "./contractReducer";
import { navbarReducer } from "./navbarReducer";
import { languageReducer } from "./languageReducer";

export const rootReducer = combineReducers({
    company: companyReducer,
    user: userReducer,
    users: usersReducer,
    usersCategories: usersCategoriesReducer,
    partners: partnerReducer,
    assets: assetReducer,
    assetCategories: assetCategoriesReducer,
    news: newsReducer,
    transactions: transactionReducer,
    contracts: contractReducer,
    navbar: navbarReducer,
    languages: languageReducer
});
