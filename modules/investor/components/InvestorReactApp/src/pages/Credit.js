import React from 'react';
import PageLayout from '../layouts/PageLayout';
import CreditPage from '../components/credit';
import { t } from '@lingui/macro';

const Credit = () => {
    return (
        <PageLayout title={t({
            id: 'Кредит', 
            message: 'Кредит'
        })}>
            <CreditPage />
        </PageLayout>
    )
}

export default Credit;