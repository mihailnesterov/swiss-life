import React from 'react';
import PageLayout from '../layouts/PageLayout';
import TransferPage from '../components/transfer';
import { t } from '@lingui/macro';

const Transfer = () => {
    return (
        <PageLayout title={t({
            id: 'Перевод средств', 
            message: 'Перевод средств'
        })}>
            <TransferPage />
        </PageLayout>
    )
}

export default Transfer;