import React from 'react';
import UserInvestmentsList from './UserInvestmentsList';
import InvestmentList from './InvestmentList';

const InvestmentPage = () => {

    return (
        <div className='page-investment'>
            <UserInvestmentsList />
            <InvestmentList />
        </div>
    )
}

export default InvestmentPage;