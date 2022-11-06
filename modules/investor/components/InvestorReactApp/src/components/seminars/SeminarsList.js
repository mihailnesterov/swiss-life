import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import Pagination from '../common/pagination';
import SeminarItem from './SeminarItem';
import Spinner from '../common/loader/Spinner';

const SeminarsList = () => {

    const {seminars, links, meta, loading} = useSelector( state => state.seminars);

    const {fetchSeminars} = useActions();

    useEffect(() => {
        fetchSeminars({'per-page':'8'});
    },[]);

    return (
        loading ?
        <Spinner size={2} /> :

        <div className='seminars-list'>
            <div>
                {
                    seminars && 
                    seminars.length > 0 && 
                    seminars.map(item => <SeminarItem key={item.id} item={item} />)
                }
            </div>
            <Pagination 
                id={null} 
                links={links} 
                meta={meta} 
                params={{'per-page':'8'}}
                fetchData={fetchSeminars} 
            />
        </div>
    )
}

export default SeminarsList;