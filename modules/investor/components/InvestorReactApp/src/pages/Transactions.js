import React from 'react';
import PageLayout from '../layouts/PageLayout';
import TransactionsPage from '../components/transactions';
import { t } from '@lingui/macro';

const Transactions = () => {
    return (
        <PageLayout title={t({
            id: 'Финансовые операции', 
            message: 'Финансовые операции'
        })}>
            <TransactionsPage />
        </PageLayout>
    )
}

export default Transactions;