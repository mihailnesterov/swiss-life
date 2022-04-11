import React from 'react';
import PageLayout from '../layouts/PageLayout';
import TransactionsPage from '../components/transactions';

const Transactions = () => {
    return (
        <PageLayout title='Финансовые операции'>
            <TransactionsPage />
        </PageLayout>
    )
}

export default Transactions;