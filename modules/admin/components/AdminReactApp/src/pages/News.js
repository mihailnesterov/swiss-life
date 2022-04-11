import React from 'react';
import NewsPage from '../components/news';
import PageLayout from '../layouts/PageLayout';

const News = () => {
    return (
        <PageLayout title='Новости'>
            <NewsPage />
        </PageLayout>
    )
}


export default News;