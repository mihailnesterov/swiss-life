import React from 'react';
import PageLayout from '../layouts/PageLayout';
import WithdrawalsPage from '../components/withdrawals';

const Withdrawals = () => {
    return (
        <PageLayout title='Вывод средств'>
            <WithdrawalsPage />
        </PageLayout>
    )
}

export default Withdrawals;