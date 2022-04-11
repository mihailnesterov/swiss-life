import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';
import NewsItem from '../components/news/NewsItem';
import Spinner from '../components/common/loader/Spinner';
import { getNewsById } from '../api/news';
import {getDateTimeToString} from '../utils/dates';

const NewsItemPage = () => {
    
    const {id} = useParams();

    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(null);
    const [news, setNews] = useState(null);

    useEffect(() => {
        if(id === 'new') {
            setTitle('Добавить новость');
        } else {
            setLoading(true);
            getNewsById(parseInt(id))
                .then(res => setNews(res.data))
                .catch(err => console.log(err))
                .finally(() => setLoading(false));
        }
        
        return () => setNews(null);
    },[id]);

    useEffect(() => {
        if(news && news.id) {
            setTitle(`Новость: ${news.title}, от ${getDateTimeToString(news.created)}`);
        }
        
        return () => setTitle(null);
    },[news]);

    if(loading) {
        return(
            <div className='m-1'>
                <Spinner size={2} />
            </div>
        );
    }

    return (
        <PageLayout title={title}>
            <div className='page-news'>
                <NewsItem news={news} />
            </div>
        </PageLayout>
    )
}

export default NewsItemPage;