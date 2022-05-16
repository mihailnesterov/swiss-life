import React from 'react';
import PageLayout from '../layouts/PageLayout';
import InvestmentPage from '../components/investment';
import { t } from '@lingui/macro';

const Investment = () => {
    return (
        <PageLayout title={t({
            id: 'Инвестирование', 
            message: 'Инвестирование'
        })}>
            <InvestmentPage />
        </PageLayout>
    )
}

export default Investment;