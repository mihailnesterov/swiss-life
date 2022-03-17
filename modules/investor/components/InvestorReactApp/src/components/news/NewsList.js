import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import NewsListItem from './NewsListItem';
import Spinner from '../common/loader/Spinner';

const NewsList = () => {

    const {news, loading} = useSelector( state => state.news);

    const {fetchNews} = useActions();

    useEffect(() => {
        fetchNews();
    },[]);

    return (
        <div className='news-list'>
            <div>
                {
                    loading ?
                    <Spinner size={2} /> :
                    news.map(item => <NewsListItem key={item.id} item={item} />)
                }
            </div>
        </div>
    )
}


export default NewsList;