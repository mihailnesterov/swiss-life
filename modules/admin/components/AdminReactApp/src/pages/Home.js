import React from 'react';
import PageLayout from '../layouts/PageLayout';
import HomePage from '../components/home';

const Home = () => {
    return (
        <PageLayout title='Кабинет администратора'>
            <HomePage />
        </PageLayout>
    )
}

export default Home;