import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useActions } from '../hooks/useActions';
import PageLayoutWithoutTitle from '../layouts/PageLayoutWithoutTitle';
import NewsItem from '../components/news/NewsItem';

const NewsItemPage = () => {
    
    const {id} = useParams();

    const {news} = useSelector( state => state.news);

    const {fetchNewsById} = useActions();

    useEffect(() => {
        fetchNewsById(parseInt(id));
    },[id]);

    return (
        news && 
        news.length > 0 &&
        <PageLayoutWithoutTitle>
            <div className='page-news'>
                <NewsItem item={news[0]} />
            </div>
        </PageLayoutWithoutTitle>
    )
}

export default NewsItemPage;