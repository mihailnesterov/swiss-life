import React from 'react';
import PageLayout from '../layouts/PageLayout';
import AddAccountBtn from '../components/common/buttons/AddAccountBtn';
import HomePage from '../components/home';

const Home = () => {
    return (
        <PageLayout title={
            <>
                <span>Кабинет инвестора</span> 
                <span><AddAccountBtn /></span>
            </>
        }>
            <HomePage />
        </PageLayout>
    )
}


export default Home;