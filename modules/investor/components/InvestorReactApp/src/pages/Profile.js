import React from 'react';
import PageLayout from '../layouts/PageLayout';
import ProfilePage from '../components/profile';
import { t } from '@lingui/macro';

const Profile = () => {
    return (
        <PageLayout title={t({
            id: 'Мой профиль', 
            message: 'Мой профиль'
        })}>
            <ProfilePage />
        </PageLayout>
    )
}

export default Profile;