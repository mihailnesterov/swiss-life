import React from 'react';
import PageLayout from '../layouts/PageLayout';
import AddAccountBtn from '../components/common/buttons/AddAccountBtn';
import HomePage from '../components/home';
import { Trans } from '@lingui/macro';

const Home = () => {
    return (
        <PageLayout title={
            <>
                <span><Trans>Кабинет инвестора</Trans></span> 
                <span><AddAccountBtn /></span>
            </>
        }>
            <HomePage />
        </PageLayout>
    )
}


export default Home;