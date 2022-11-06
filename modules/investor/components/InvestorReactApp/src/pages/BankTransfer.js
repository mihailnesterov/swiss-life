import React from 'react';
import PageLayout from '../layouts/PageLayout';
import BankTransferPage from '../components/banktransfer';
import { t } from '@lingui/macro';

const BankTransfer = () => {
    return (
        <PageLayout title={t({
            id: 'Банковский перевод', 
            message: 'Банковский перевод'
        })}>
            <BankTransferPage />
        </PageLayout>
    )
}

export default BankTransfer;