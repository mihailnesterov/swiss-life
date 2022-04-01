import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import Pagination from '../common/pagination';
import TransactionItem from './TransactionItem';
import TransactionsHead from './TransactionsHead';
import Spinner from '../common/loader/Spinner';

const TransactionsList = (props) => {

    const {user} = props;

    const {transactions, links, meta, loading} = useSelector( state => state.transactions);

    const {fetchUserTransactions} = useActions();

    useEffect(() => {
        fetchUserTransactions(user.id, {
            'per-page': '5',
            'page': '1'
        });
    },[user]);

    return (
        <div className='transactions-list'>
            <h3>Список финансовых операций</h3>
            <TransactionsHead />
            <div>
                {
                    loading ?
                    <Spinner size={2} /> :
                    transactions.map(item => <TransactionItem key={item.id} item={item} />)
                }
            </div>
            <Pagination 
                id={user.id} 
                links={links} 
                meta={meta} 
                fetchData={fetchUserTransactions} 
            />
        </div>
    )
}

export default TransactionsList;