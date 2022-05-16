import React from 'react';
import PageLayout from '../layouts/PageLayout';
import ContractsPage from '../components/contracts';
import { t } from '@lingui/macro';

const Contracts = () => {
    return (
        <PageLayout title={t({
            id: 'Договоры', 
            message: 'Договоры'
        })}>
            <ContractsPage />
        </PageLayout>
    )
}

export default Contracts;