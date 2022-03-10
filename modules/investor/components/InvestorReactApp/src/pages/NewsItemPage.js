import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useActions } from '../hooks/useActions';
import PageLayout from '../layouts/PageLayout';
import NewsItem from '../components/news/NewsItem';

const NewsItemPage = () => {
    
    const {id} = useParams();

    const {news, loading} = useSelector( state => state.news);

    const {fetchNewsById} = useActions();

    useEffect(() => {
        fetchNewsById(parseInt(id));
    },[id]);

    console.log(1, news, parseInt(id));

    return (
        news && 
        news.length > 0 &&
        <PageLayout title={news[0].title}>
            <div className='page-news'>
                <NewsItem item={news[0]} />
            </div>
        </PageLayout>
    )
}


export default NewsItemPage;