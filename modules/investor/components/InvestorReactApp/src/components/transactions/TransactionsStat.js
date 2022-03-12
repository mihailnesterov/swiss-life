import React, { useEffect, useState } from 'react';
import TransactionsStatList from './TransactionsStatList';

const TransactionsStat = (props) => {

    const {user} = props;

    const [userAccounts, setUserAccounts] = useState(null);
    const [transactionsStat, setTransactionsStat] = useState(null);

    useEffect(() => {
        if(user.accounts && user.accounts.length > 0) {
            setUserAccounts(user.accounts);
        }
    },[user]);

    useEffect(() => {
        if(userAccounts && userAccounts.length > 0) {
            
            const _stat = userAccounts.map((item, i) => {
                return {
                    id: i,
                    accountNum: item.number,
                    currency: item.currency,
                    stat: item.transactionsStat,
                }
            });
            
            if(_stat.length > 0) 
                setTransactionsStat(_stat);
        }
    },[userAccounts]);

    return (
        transactionsStat && 
        <div className='transactions-stat'>
            <TransactionsStatList stat={transactionsStat} />
        </div>
    )
}

export default TransactionsStat;