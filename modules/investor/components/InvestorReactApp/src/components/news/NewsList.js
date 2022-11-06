import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import Pagination from '../common/pagination';
import NewsListItem from './NewsListItem';
import Spinner from '../common/loader/Spinner';

const NewsList = () => {

    const {news, links, meta, loading} = useSelector( state => state.news);

    const {fetchNews} = useActions();

    useEffect(() => {
        fetchNews({'per-page':'8'});
    },[]);

    return (
        loading ?
        <Spinner size={2} /> :

        <div className='news-list'>
            <div>
                {
                    news && 
                    news.length > 0 && 
                    news.map(item => <NewsListItem key={item.id} item={item} />)
                }
            </div>
            <Pagination 
                id={null} 
                links={links} 
                meta={meta} 
                params={{'per-page':'8'}}
                fetchData={fetchNews} 
            />
        </div>
    )
}

export default NewsList;