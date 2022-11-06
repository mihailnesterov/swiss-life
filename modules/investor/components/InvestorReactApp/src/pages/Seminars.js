import React from 'react';
import SeminarsPage from '../components/seminars';
import PageLayout from '../layouts/PageLayout';
import { t } from '@lingui/macro';

const Seminars = () => {
    return (
        <PageLayout title={t({
            id: 'Семинары и тренинги', 
            message: 'Семинары и тренинги'
        })}>
            <SeminarsPage />
        </PageLayout>
    )
}

export default Seminars;