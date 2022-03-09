import React from 'react';
import { useSelector } from "react-redux";
import TransactionsList from './TransactionsList';

const TransactionsPage = () => {

    const {user} = useSelector( state => state.user);

    return (
        <div className='page-transactions'>
            {
                user && user.id &&
                <TransactionsList user={user} />
            }
        </div>
    )
}

export default TransactionsPage;