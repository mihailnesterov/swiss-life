import React from 'react';
import { useSelector } from "react-redux";
import TransactionsList from './TransactionsList';
import TransactionsStat from './TransactionsStat';

const TransactionsPage = () => {

    const {user} = useSelector( state => state.user);

    return (
        <div className='page-transactions'>
            {
                user && user.id &&
                <>
                    <TransactionsStat user={user} />
                    <TransactionsList user={user} />
                </>
                
            }
        </div>
    )
}

export default TransactionsPage;