import React from 'react';
import PageLayout from '../layouts/PageLayout';
import TransferPage from '../components/transfer';
import { t } from '@lingui/macro';

const Transfer = () => {
    return (
        <PageLayout title={t({
            id: 'Внутренний перевод', 
            message: 'Внутренний перевод'
        })}>
            <TransferPage />
        </PageLayout>
    )
}

export default Transfer;