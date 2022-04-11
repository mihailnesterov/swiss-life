import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import Pagination from '../common/pagination';
import PartnersListItem from './PartnersListItem';
import Spinner from '../common/loader/Spinner';
import PartnersHead from './PartnersHead';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../api';
import ListMetaHeader from '../common/header/ListMetaHeader';

const PartnersList = () => {

    const {partners, links, meta, loading} = useSelector( state => state.partners);

    const {fetchPartners} = useActions();

    useEffect(() => {
        fetchPartners({'sort':'-created'});
    },[]);

    const fetchData = () => {
        fetchPartners({'sort':'-created'});
    }

    return (
        <div className='partners-list'>
            <div>
                <ListMetaHeader
                    title="Список партнеров"
                    meta={meta}
                />
                <Link to={`${BASE_URL}/partners/new`}>+ Добавить</Link>
            </div>
            <PartnersHead />
            <div>
                {
                    loading ?
                    <Spinner size={2} /> :
                    partners.map(item => <PartnersListItem key={item.id} item={item} />)
                }
            </div>
            <Pagination 
                id={null} 
                links={links} 
                meta={meta} 
                fetchData={fetchData} 
            />
        </div>
    )
}

export default PartnersList;