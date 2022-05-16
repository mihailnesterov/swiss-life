import React from 'react';
import NewsPage from '../components/news';
import PageLayout from '../layouts/PageLayout';
import { t } from '@lingui/macro';

const News = () => {
    return (
        <PageLayout title={t({
            id: 'Новости', 
            message: 'Новости'
        })}>
            <NewsPage />
        </PageLayout>
    )
}

export default News;