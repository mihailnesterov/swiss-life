import React from 'react';
import PageLayout from '../layouts/PageLayout';
import HomePage from '../components/home';
import { t } from '@lingui/macro';

const Home = () => {
    return (
        <PageLayout title={t({
            id: 'Кабинет инвестора', 
            message: 'Кабинет инвестора'
        })}>
            <HomePage />
        </PageLayout>
    )
}

export default Home;