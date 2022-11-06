import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import Pagination from '../common/pagination';
import NewsListItem from './NewsListItem';
import Spinner from '../common/loader/Spinner';
import NewsHead from './NewsHead';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../api';

const NewsList = () => {

    const {news, links, meta, loading} = useSelector( state => state.news);

    const {fetchNews} = useActions();

    useEffect(() => {
        fetchNews({'per-page':'8'});
    },[]);

    return (
        <div className='news-list'>
            <div>
                <h3>Список новостей{meta && meta.totalCount && ` (${meta.totalCount})`}</h3>
                <Link to={`${BASE_URL}/news/new`}>+ Добавить</Link>
            </div>
            <NewsHead />
            <div>
                {
                    loading ?
                    <Spinner size={2} /> :
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