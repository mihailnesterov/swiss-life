import React from 'react';
import SeminarsPage from '../components/seminars';
import PageLayout from '../layouts/PageLayout';

const Seminars = () => {
    return (
        <PageLayout title='Семинары и тренинги'>
            <SeminarsPage />
        </PageLayout>
    )
}

export default Seminars;