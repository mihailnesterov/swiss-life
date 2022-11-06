import React from 'react';
import Enum from '../utils/enum';
import {BASE_URL} from '../api';
import Home from '../pages/Home';
import Error404 from '../pages/Error404';
import Documents from '../pages/Documents';
import Investment from '../pages/Investment';
import InvestmentItemPage from '../pages/InvestmentItemPage';
import InvestPage from '../pages/InvestPage';
import Credit from '../pages/Credit';
import RepayCredit from '../pages/RepayCredit';
import MessagesIn from '../pages/MessagesIn';
import MessagesOut from '../pages/MessagesOut';
import Seminars from '../pages/Seminars';
import News from '../pages/News';
import NewsItemPage from '../pages/NewsItemPage';
import Profile from '../pages/Profile';
import ChangePhoto from '../pages/ChangePhoto';
import ChangePassword from '../pages/ChangePassword';
import Transactions from '../pages/Transactions';
import Withdrawals from '../pages/Withdrawals';
import Transfer from '../pages/Transfer';
import BankTransfer from '../pages/BankTransfer';
import AddAccountPage from '../pages/AddAccountPage';
import Members from '../pages/Members';
import Contracts from '../pages/Contracts';

export const RouteNames = Enum({
    HOME: `${BASE_URL}`,
    ERROR404: `${BASE_URL}/404`,
    DOCUMENTS: `${BASE_URL}/documents`,
    INVESTMENT: `${BASE_URL}/investment`,
    INVESTMENT_ITEM_PAGE: `${BASE_URL}/investment/:id`,
    INVEST_PAGE: `${BASE_URL}/invest/:id`,
    MESSAGES_IN: `${BASE_URL}/messages-in`,
    MESSAGES_OUT: `${BASE_URL}/messages-out`,
    CREDIT: `${BASE_URL}/credit`,
    REPAY_CREDIT: `${BASE_URL}/repay-credit`,
    SEMINARS: `${BASE_URL}/seminars`,
    NEWS: `${BASE_URL}/news`,
    NEWS_ITEM_PAGE: `${BASE_URL}/news/:id`,
    PROFILE: `${BASE_URL}/profile`,
    CHANGE_PHOTO: `${BASE_URL}/change-photo`,
    CHANGE_PASSWORD: `${BASE_URL}/change-password`,
    TRANSACTIONS: `${BASE_URL}/transactions`,
    WITHDRAWALS: `${BASE_URL}/withdrawals`,
    TRANSFER: `${BASE_URL}/transfer`,
    BANK_TRANSFER: `${BASE_URL}/bank-transfer`,
    ADD_ACCOUNT: `${BASE_URL}/add-account`,
    MEMBERS: `${BASE_URL}/members`,
    CONTRACTS: `${BASE_URL}/contracts`,
    LOGOUT: `${BASE_URL}/logout`,
});

export const investorRoutes = [
    {id: 1, path: RouteNames.HOME, element: Home, navbar: true, size: 'normal', title: "Кабинет инвестора"},
    {id: 2, path: RouteNames.TRANSACTIONS, element: Transactions, navbar: true, size: 'normal', title: "Финансовые операции"},
    {id: 3, path: RouteNames.TRANSFER, element: Transfer, navbar: true, size: 'small', title: "Внутренний перевод"},
    {id: 4, path: RouteNames.BANK_TRANSFER, element: BankTransfer, navbar: true, size: 'small', title: "Банковский перевод"},
    {id: 5, path: RouteNames.INVESTMENT, element: Investment, navbar: true, size: 'small', title: "Инвестирование"},
    {id: 6, path: RouteNames.WITHDRAWALS, element: Withdrawals, navbar: true, size: 'small', title: "Вывод средств"},
    {id: 7, path: RouteNames.CREDIT, element: Credit, navbar: true, size: 'normal', title: "Кредит"},
    {id: 8, path: RouteNames.REPAY_CREDIT, element: RepayCredit, navbar: false, size: 'normal', title: "Погасить кредит"},
    {id: 9, path: RouteNames.NEWS, element: News, navbar: true, size: 'normal', title: "Новости"},
    {id: 10, path: RouteNames.MESSAGES_IN, element: MessagesIn, navbar: true, size: 'normal', title: "Сообщения"},
    {id: 11, path: RouteNames.MESSAGES_OUT, element: MessagesOut, navbar: false, size: 'normal', title: "Сообщения"},
    {id: 12, path: RouteNames.SEMINARS, element: Seminars, navbar: true, size: 'small', title: "Семинары и тренинги"},
    {id: 13, path: RouteNames.MEMBERS, element: Members, navbar: true, size: 'normal', title: "Подписчики"},
    {id: 14, path: RouteNames.DOCUMENTS, element: Documents, navbar: true, size: 'normal', title: "Документы"},
    {id: 15, path: RouteNames.CONTRACTS, element: Contracts, navbar: true, size: 'small', title: "Договоры"},
    {id: 16, path: RouteNames.PROFILE, element: Profile, navbar: false, size: 'small', title: "Мой профиль"},
    {id: 17, path: RouteNames.CHANGE_PHOTO, element: ChangePhoto, navbar: false, size: 'small', title: "Изменить фото"},
    {id: 18, path: RouteNames.CHANGE_PASSWORD, element: ChangePassword, navbar: false, size: 'small', title: "Изменить пароль"},
    {id: 19, path: RouteNames.ERROR404, element: Error404, navbar: false, size: 'normal', title: "404 ошибка"},
    {id: 20, path: RouteNames.NEWS_ITEM_PAGE, element: NewsItemPage, navbar: false, size: 'small', exact: true, title: "Новость"},
    {id: 21, path: RouteNames.INVESTMENT_ITEM_PAGE, element: InvestmentItemPage, navbar: false, size: 'small', exact: true, title: "Объект инвестирования"},
    {id: 22, path: RouteNames.INVEST_PAGE, element: InvestPage, navbar: false, size: 'small', exact: true, title: "Инвестировать в объект"},
    {id: 23, path: RouteNames.ADD_ACCOUNT, element: AddAccountPage, navbar: false, size: 'small', title: "Открыть счет"},
];
