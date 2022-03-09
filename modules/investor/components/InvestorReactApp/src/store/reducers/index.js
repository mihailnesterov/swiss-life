import { combineReducers } from "redux";
import { companyReducer } from "./companyReducer";
import { userReducer } from "./userReducer";
import { partnerReducer } from "./partnerReducer";
import { assetReducer } from "./assetReducer";
import { newsReducer } from "./newsReducer";
import { transactionReducer } from "./transactionReducer";

export const rootReducer = combineReducers({
    company: companyReducer,
    user: userReducer,
    partners: partnerReducer,
    assets: assetReducer,
    news: newsReducer,
    transactions: transactionReducer,
});
