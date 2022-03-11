import React from 'react';
import PageLayout from '../layouts/PageLayout';
import InvestmentPage from '../components/investment';

const Investment = () => {
    return (
        <PageLayout title='Инвестирование'>
            <InvestmentPage />
        </PageLayout>
    )
}

export default Investment;