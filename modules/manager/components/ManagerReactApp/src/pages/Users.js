import React from 'react';
import PageLayout from '../layouts/PageLayout';
import UsersPage from '../components/user';

const Users = () => {
    return (
        <PageLayout title='Пользователи'>
            <UsersPage />
        </PageLayout>
    )
}

export default Users;