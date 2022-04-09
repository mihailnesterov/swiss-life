import React from 'react';
import PageLayout from '../layouts/PageLayout';
import ProfilePage from '../components/profile';

const Profile = () => {
    return (
        <PageLayout title='Мой профиль'>
            <ProfilePage />
        </PageLayout>
    )
}

export default Profile;