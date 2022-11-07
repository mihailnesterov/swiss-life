import React from 'react';
import Enum from '../utils/enum';
import {BASE_URL} from '../api';
import Home from '../pages/Home';
import Error404 from '../pages/Error404';
import Users from '../pages/Users';
import UserItemPage from '../pages/UserItemPage';
import Investment from '../pages/Investment';
import InvestmentItemPage from '../pages/InvestmentItemPage';
import Messages from '../pages/Messages';
import News from '../pages/News';
import NewsItemPage from '../pages/NewsItemPage';
import Profile from '../pages/Profile';
import Transactions from '../pages/Transactions';
import TransactionItemPage from '../pages/TransactionItemPage';
import Contracts from '../pages/Contracts';
import ContractItemPage from '../pages/ContractItemPage';
import Partners from '../pages/Partners';
import PartnerItemPage from '../pages/PartnerItemPage';
import Seminars from '../pages/Seminars';
import SeminarItemPage from '../pages/SeminarItemPage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export const RouteNames = Enum({
    HOME: `${BASE_URL}`,
    ERROR404: `${BASE_URL}/404`,
    USERS: `${BASE_URL}/users`,
    USERS_ITEM_PAGE: `${BASE_URL}/users/:id`,
    INVESTMENT: `${BASE_URL}/investment`,
    INVESTMENT_ITEM_PAGE: `${BASE_URL}/investment/:id`,
    MESSAGES: `${BASE_URL}/messages`,
    NEWS: `${BASE_URL}/news`,
    NEWS_ITEM_PAGE: `${BASE_URL}/news/:id`,
    PROFILE: `${BASE_URL}/profile`,
    TRANSACTIONS: `${BASE_URL}/transactions`,
    TRANSACTION_ITEM_PAGE: `${BASE_URL}/transactions/:id`,
    CONTRACTS: `${BASE_URL}/contracts`,
    CONTRACTS_ITEM_PAGE: `${BASE_URL}/contracts/:id`,
    PARTNERS: `${BASE_URL}/partners`,
    PARTNERS_ITEM_PAGE: `${BASE_URL}/partners/:id`,
    SEMINARS: `${BASE_URL}/seminars`,
    SEMINARS_ITEM_PAGE: `${BASE_URL}/seminars/:id`,
    LOGOUT: `${BASE_URL}/logout`,
});

export const investorRoutes = [
    {id: 1, path: RouteNames.HOME, element: Home, navbar: true, icon: <FontAwesomeIcon icon={solid('house-user')} />, title: "Кабинет менеджера"},
    {id: 2, path: RouteNames.USERS, element: Users, navbar: true, icon: <FontAwesomeIcon icon={solid('users')} />, title: "Пользователи"},
    {id: 3, path: RouteNames.TRANSACTIONS, element: Transactions, navbar: true, icon: <FontAwesomeIcon icon={solid('coins')} />, title: "Финансовые операции"},
    {id: 4, path: RouteNames.TRANSACTION_ITEM_PAGE, element: TransactionItemPage, navbar: false, icon: <FontAwesomeIcon icon={solid('coins')} />, title: "Финансовая операция"},
    {id: 5, path: RouteNames.INVESTMENT, element: Investment, navbar: true, icon: <FontAwesomeIcon icon={solid('briefcase')} />, title: "Активы"},
    {id: 6, path: RouteNames.NEWS, element: News, navbar: true, icon: <FontAwesomeIcon icon={solid('newspaper')} />, title: "Новости"},
    {id: 7, path: RouteNames.MESSAGES, element: Messages, navbar: true, icon: <FontAwesomeIcon icon={solid('envelope')} />, title: "Сообщения"},
    {id: 8, path: RouteNames.SEMINARS, element: Seminars, navbar: true, icon: <FontAwesomeIcon icon={solid('person-chalkboard')} />, title: "Семинары"},
    {id: 9, path: RouteNames.SEMINARS_ITEM_PAGE, element: SeminarItemPage, navbar: false, icon: <FontAwesomeIcon icon={solid('person-chalkboard')} />, title: "Семинар"},
    {id: 10, path: RouteNames.PARTNERS, element: Partners, navbar: true, icon: <FontAwesomeIcon icon={solid('handshake')} />, title: "Партнеры"},
    {id: 11, path: RouteNames.PARTNERS_ITEM_PAGE, element: PartnerItemPage, navbar: false, icon: <FontAwesomeIcon icon={solid('handshake')} />, title: "Партнер"},
    {id: 12, path: RouteNames.CONTRACTS, element: Contracts, navbar: true, icon: <FontAwesomeIcon icon={solid('file-contract')} />, title: "Договоры"},
    {id: 13, path: RouteNames.CONTRACTS_ITEM_PAGE, element: ContractItemPage, navbar: false, icon: <FontAwesomeIcon icon={solid('file-contract')} />, title: "Договор"},
    {id: 14, path: RouteNames.PROFILE, element: Profile, navbar: false, icon: <FontAwesomeIcon icon={solid('user-tie')} />, title: "Мой профиль"},
    {id: 15, path: RouteNames.ERROR404, element: Error404, navbar: false, title: "404 ошибка"},
    {id: 16, path: RouteNames.NEWS_ITEM_PAGE, element: NewsItemPage, navbar: false, icon: <FontAwesomeIcon icon={solid('newspaper')} />, title: "Новость"},
    {id: 17, path: RouteNames.INVESTMENT_ITEM_PAGE, element: InvestmentItemPage, navbar: false, icon: <FontAwesomeIcon icon={solid('briefcase')} />, exact: true, title: "Объект инвестирования"},
    {id: 18, path: RouteNames.USERS_ITEM_PAGE, element: UserItemPage, navbar: false, icon: <FontAwesomeIcon icon={solid('user')} />, title: "Пользователь"},
];
