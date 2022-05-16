import React from 'react';
import PageLayout from '../layouts/PageLayout';
import MembersPage from '../components/members';
import { t } from '@lingui/macro';

const Members = () => {
    return (
        <PageLayout title={t({
            id: 'Подписчики', 
            message: 'Подписчики'
        })}>
            <MembersPage />
        </PageLayout>
    )
}

export default Members;