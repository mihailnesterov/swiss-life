import React from 'react';
import PageLayout from '../layouts/PageLayout';
import RepayCreditPage from '../components/repaycredit';
import { t } from '@lingui/macro';

const RepayCredit = () => {
    return (
        <PageLayout title={t({
            id: 'Погасить кредит', 
            message: 'Погасить кредит'
        })}>
            <RepayCreditPage />
        </PageLayout>
    )
}

export default RepayCredit;