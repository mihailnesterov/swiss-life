import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import Pagination from '../common/pagination';
import SeminarsHead from './SeminarsHead';
import SeminarsListItem from './SeminarsListItem';
import Spinner from '../common/loader/Spinner';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../api';

const SeminarsList = () => {

    const {seminars, links, meta, loading} = useSelector( state => state.seminars);

    const {fetchSeminars} = useActions();

    useEffect(() => {
        fetchSeminars({'per-page':'8'});
    },[]);

    return (
        <div className='seminars-list'>
            <div>
                <h3>Список семинаров{meta && meta.totalCount && ` (${meta.totalCount})`}</h3>
                <Link to={`${BASE_URL}/seminars/new`}>+ Добавить</Link>
            </div>
            <SeminarsHead />
            <div>
                {
                    loading ?
                    <Spinner size={2} /> :
                    seminars.map(item => <SeminarsListItem key={item.id} item={item} />)
                }
            </div>
            <Pagination 
                id={null} 
                links={links} 
                meta={meta} 
                fetchData={fetchSeminars} 
            />
        </div>
    )
}

export default SeminarsList;