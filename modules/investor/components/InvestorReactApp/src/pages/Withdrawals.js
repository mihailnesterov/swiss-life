import React from 'react';
import PageLayout from '../layouts/PageLayout';
import WithdrawalsPage from '../components/withdrawals';
import { t } from '@lingui/macro';

const Withdrawals = () => {
    return (
        <PageLayout title={t({
            id: 'Вывод средств', 
            message: 'Вывод средств'
        })}>
            <WithdrawalsPage />
        </PageLayout>
    )
}

export default Withdrawals;