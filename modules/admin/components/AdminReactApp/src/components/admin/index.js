import React, {useEffect} from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import AdminsList from './AdminsList';
import Spinner from '../common/loader/Spinner';

const AdminPage = () => {

    const {admins, links, meta, loading} = useSelector( state => state.admins);

    const {fetchRoleAdminExpanded} = useActions();

    useEffect(() => {
        fetchRoleAdminExpanded();
    },[]);

    return (
        loading ?
        <Spinner size={2} /> :
        
        <AdminsList 
            admins={admins} 
            links={links} 
            meta={meta}
        />
    )
}

export default AdminPage;