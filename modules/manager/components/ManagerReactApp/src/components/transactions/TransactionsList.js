import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import Pagination from '../common/pagination';
import TransactionListItem from './TransactionListItem';
import TransactionsHead from './TransactionsHead';
import Spinner from '../common/loader/Spinner';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../api';

const TransactionsList = () => {

    const {transactions, links, meta, loading} = useSelector( state => state.transactions);

    const {fetchManagerAuthorizedTransactions} = useActions();

    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = () => {
        fetchManagerAuthorizedTransactions({
            'sort':'-created'
        });
    }

    return (
        <div className='transactions-list'>
            <div>
                <h3>Список финансовых операций{meta && meta.totalCount && ` (${meta.totalCount})`}</h3>
                <Link to={`${BASE_URL}/transactions/new`}>+ Добавить</Link>
            </div>
            <TransactionsHead />
            <div>
                {
                    loading ?
                    <Spinner size={2} /> :
                    transactions.map(item => <TransactionListItem key={item.id} item={item} />)
                }
            </div>
            <Pagination 
                id={null} 
                links={links} 
                meta={meta} 
                fetchData={fetchData} 
            />
        </div>
    )
}

export default TransactionsList;