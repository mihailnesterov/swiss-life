import React from 'react';
import Enum from '../utils/enum';
import {BASE_URL} from '../api';
import Home from '../pages/Home';
import Error404 from '../pages/Error404';
import Documents from '../pages/Documents';
import Investment from '../pages/Investment';
import InvestmentItemPage from '../pages/InvestmentItemPage';
import InvestPage from '../pages/InvestPage';
import Messages from '../pages/Messages';
import News from '../pages/News';
import NewsItemPage from '../pages/NewsItemPage';
import Profile from '../pages/Profile';
import Transactions from '../pages/Transactions';
import Withdrawals from '../pages/Withdrawals';
import Transfer from '../pages/Transfer';
import AddAccountPage from '../pages/AddAccountPage';
import Members from '../pages/Members';
import Contracts from '../pages/Contracts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export const RouteNames = Enum({
    HOME: `${BASE_URL}`,
    ERROR404: `${BASE_URL}/404`,
    DOCUMENTS: `${BASE_URL}/documents`,
    INVESTMENT: `${BASE_URL}/investment`,
    INVESTMENT_ITEM_PAGE: `${BASE_URL}/investment/:id`,
    INVEST_PAGE: `${BASE_URL}/invest/:id`,
    MESSAGES: `${BASE_URL}/messages`,
    NEWS: `${BASE_URL}/news`,
    NEWS_ITEM_PAGE: `${BASE_URL}/news/:id`,
    PROFILE: `${BASE_URL}/profile`,
    TRANSACTIONS: `${BASE_URL}/transactions`,
    WITHDRAWALS: `${BASE_URL}/withdrawals`,
    TRANSFER: `${BASE_URL}/transfer`,
    ADD_ACCOUNT: `${BASE_URL}/add-account`,
    MEMBERS: `${BASE_URL}/members`,
    CONTRACTS: `${BASE_URL}/contracts`,
    LOGOUT: `${BASE_URL}/logout`,
});

export const investorRoutes = [
    {id: 1, path: RouteNames.HOME, element: Home, navbar: true, icon: <FontAwesomeIcon icon={solid('house-user')} />, title: "Кабинет инвестора"},
    {id: 2, path: RouteNames.TRANSACTIONS, element: Transactions, navbar: true, icon: <FontAwesomeIcon icon={solid('coins')} />, title: "Финансовые операции"},
    {id: 3, path: RouteNames.WITHDRAWALS, element: Withdrawals, navbar: true, icon: <FontAwesomeIcon icon={solid('arrow-right-arrow-left')} />, title: "Вывод средств"},
    {id: 4, path: RouteNames.TRANSFER, element: Transfer, navbar: true, icon: <FontAwesomeIcon icon={solid('arrow-right-arrow-left')} />, title: "Перевод средств"},
    {id: 5, path: RouteNames.INVESTMENT, element: Investment, navbar: true, icon: <FontAwesomeIcon icon={solid('briefcase')} />, title: "Инвестирование"},
    {id: 6, path: RouteNames.NEWS, element: News, navbar: true, icon: <FontAwesomeIcon icon={solid('newspaper')} />, title: "Новости"},
    {id: 7, path: RouteNames.MESSAGES, element: Messages, navbar: true, icon: <FontAwesomeIcon icon={solid('envelope')} />, title: "Сообщения"},
    {id: 8, path: RouteNames.MEMBERS, element: Members, navbar: true, icon: <FontAwesomeIcon icon={solid('user-group')} />, title: "Подписчики"},
    {id: 9, path: RouteNames.DOCUMENTS, element: Documents, navbar: true, icon: <FontAwesomeIcon icon={solid('folder-open')} />, title: "Документы"},
    {id: 10, path: RouteNames.CONTRACTS, element: Contracts, navbar: true, icon: <FontAwesomeIcon icon={solid('file-contract')} />, title: "Договоры"},
    {id: 11, path: RouteNames.PROFILE, element: Profile, navbar: false, icon: <FontAwesomeIcon icon={solid('user-tie')} />, title: "Мой профиль"},
    {id: 12, path: RouteNames.ERROR404, element: Error404, navbar: false, title: "404 ошибка"},
    {id: 13, path: RouteNames.NEWS_ITEM_PAGE, element: NewsItemPage, navbar: false, icon: <FontAwesomeIcon icon={solid('newspaper')} />, exact: true, title: "Новость"},
    {id: 14, path: RouteNames.INVESTMENT_ITEM_PAGE, element: InvestmentItemPage, navbar: false, icon: <FontAwesomeIcon icon={solid('briefcase')} />, exact: true, title: "Объект инвестирования"},
    {id: 15, path: RouteNames.INVEST_PAGE, element: InvestPage, navbar: false, icon: <FontAwesomeIcon icon={solid('briefcase')} />, exact: true, title: "Инвестировать в объект"},
    {id: 16, path: RouteNames.ADD_ACCOUNT, element: AddAccountPage, navbar: false, icon: <FontAwesomeIcon icon={solid('coins')} />, title: "Открыть счет"},
];
