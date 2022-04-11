import React from 'react';
import PageLayout from '../layouts/PageLayout';
import ManagersPage from '../components/manager';

const Managers = () => {
    return (
        <PageLayout title='Менеджеры'>
            <ManagersPage />
        </PageLayout>
    )
}

export default Managers;