import { combineReducers } from "redux";
import { companyReducer } from "./companyReducer";
import { userReducer } from "./userReducer";
import { usersReducer } from "./usersReducer";
import { usersCategoriesReducer } from "./usersCategoriesReducer";
import { adminsReducer } from "./adminsReducer";
import { managersReducer } from "./managersReducer";
import { messageReducer } from "./messageReducer";
import { messagesCountReducer } from "./messagesCountReducer";
import { partnerReducer } from "./partnerReducer";
import { assetReducer } from "./assetReducer";
import { assetCategoriesReducer } from "./assetCategoriesReducer";
import { newsReducer } from "./newsReducer";
import { transactionReducer } from "./transactionReducer";
import { contractReducer } from "./contractReducer";
import { navbarReducer } from "./navbarReducer";

export const rootReducer = combineReducers({
    company: companyReducer,
    user: userReducer,
    users: usersReducer,
    usersCategories: usersCategoriesReducer,
    admins: adminsReducer,
    managers: managersReducer,
    messages: messageReducer,
    messagesCount: messagesCountReducer,
    partners: partnerReducer,
    assets: assetReducer,
    assetCategories: assetCategoriesReducer,
    news: newsReducer,
    transactions: transactionReducer,
    contracts: contractReducer,
    navbar: navbarReducer
});
