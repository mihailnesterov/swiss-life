import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import PageLayout from '../layouts/PageLayout';
import AdminItem from '../components/admin/AdminItem';
import Spinner from '../components/common/loader/Spinner';

const AdminItemPage = () => {
    
    const {id} = useParams();

    const {admins, loading} = useSelector( state => state.admins);

    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        if(admins && admins.length > 0) {
            const _admin = admins.filter(item => item.id === parseInt(id));
            if(_admin.length > 0) {
                setAdmin(_admin[0]);
            }
        }
        return () => setAdmin(null);
    },[id, admins]);

    if(loading) {
        return(
            <div className='m-1'>
                <Spinner size={2} />
            </div>
        );
    }

    return (
        admin && 
        admin.fullName &&
        <PageLayout title={`Администратор: ${admin.fullName}`}>
            <div className='page-users'>
                <AdminItem admin={admin} />
            </div>
        </PageLayout>
    )
}

export default AdminItemPage;