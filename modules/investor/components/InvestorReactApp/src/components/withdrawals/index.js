import React from 'react';
import CreditForm from './CreditForm';
import WithdrawalsForm from './WithdrawalsForm';

const WithdrawalsPage = () => {

    return (
        <div className='page-withdrawals'>
            <WithdrawalsForm />
            <CreditForm />
        </div>
    )
}

export default WithdrawalsPage;