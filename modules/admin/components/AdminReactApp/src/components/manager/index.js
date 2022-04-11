import React, {useEffect} from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import ManagersList from './ManagersList';
import Spinner from '../common/loader/Spinner';

const ManagerPage = () => {

    const {managers, links, meta, loading} = useSelector( state => state.managers);

    const {fetchRoleManagerExpanded} = useActions();

    useEffect(() => {
        fetchRoleManagerExpanded();
    },[]);

    return (
        <div className='page-managers'>
            {
                loading ?
                <Spinner size={2} /> :
                <ManagersList 
                    managers={managers} 
                    links={links} 
                    meta={meta}
                />
            }
        </div>        
    )
}

export default ManagerPage;