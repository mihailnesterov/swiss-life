import React from 'react';
import PageLayout from '../layouts/PageLayout';
import MembersPage from '../components/members';

const Members = () => {
    return (
        <PageLayout title='Подписчики'>
            <MembersPage />
        </PageLayout>
    )
}

export default Members;