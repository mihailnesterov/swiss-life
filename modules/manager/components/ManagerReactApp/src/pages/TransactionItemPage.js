import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';
import Spinner from '../components/common/loader/Spinner';
import {getTransaction} from '../api/transaction';
import {getDateTimeToString} from '../utils/dates';
import TransactionItem from '../components/transactions/TransactionItem';

const TransactionItemPage = () => {
    
    const {id} = useParams();

    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(null);
    const [transaction, setTransaction] = useState(null);

    useEffect(() => {
        if(id === 'new') {
            setTitle('Добавить финансовую операцию');
        } else {
            setLoading(true);
            getTransaction(parseInt(id))
                .then(res => setTransaction(res.data))
                .catch(err => console.log(err))
                .finally(() => setLoading(false));
        }
        
        return () => setTransaction(null);
    },[id]);

    useEffect(() => {
        if(transaction && transaction.id) {
            setTitle(`Финансовая операция № ${transaction.id} от ${getDateTimeToString(transaction.created)}`);
        }
        
        return () => setTitle(null);
    },[transaction]);

    if(loading) {
        return(
            <div className='m-1'>
                <Spinner size={2} />
            </div>
        );
    }

    return (
        <PageLayout title={title}>
            <div className='page-transactions'>
                <TransactionItem transaction={transaction}/>
            </div>
        </PageLayout>
    )
}

export default TransactionItemPage;