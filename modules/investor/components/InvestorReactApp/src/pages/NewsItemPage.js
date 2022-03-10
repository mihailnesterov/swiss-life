import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useActions } from '../hooks/useActions';
import PageLayout from '../layouts/PageLayout';
import NewsItem from '../components/news/NewsItem';
import Spinner from '../components/common/loader/Spinner';

const NewsItemPage = () => {
    
    const {id} = useParams();

    const {news, loading} = useSelector( state => state.news);

    const {fetchNewsById} = useActions();

    useEffect(() => {
        fetchNewsById(parseInt(id));
    },[id]);

    if(loading) {
        return(
            <div className='m-1'>
                <Spinner size={2} />
            </div>
        );
    }

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