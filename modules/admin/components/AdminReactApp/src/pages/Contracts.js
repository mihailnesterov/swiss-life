import React from 'react';
import PageLayout from '../layouts/PageLayout';
import ContractsPage from '../components/contracts';

const Contracts = () => {
    return (
        <PageLayout title='Договоры'>
            <ContractsPage />
        </PageLayout>
    )
}

export default Contracts;