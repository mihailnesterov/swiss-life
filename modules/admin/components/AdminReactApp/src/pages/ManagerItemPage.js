import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import PageLayout from '../layouts/PageLayout';
import ManagerItem from '../components/manager/ManagerItem';
import Spinner from '../components/common/loader/Spinner';

const ManagerItemPage = () => {
    
    const {id} = useParams();

    const {managers, loading} = useSelector( state => state.managers);

    const [manager, setManager] = useState(null);

    useEffect(() => {
        if(managers && managers.length > 0) {
            const _manager = managers.filter(item => item.id === parseInt(id));
            if(_manager.length > 0) {
                setManager(_manager[0]);
            }
        }
        return () => setManager(null);
    },[id, managers]);

    if(loading) {
        return(
            <div className='m-1'>
                <Spinner size={2} />
            </div>
        );
    }

    return (
        manager && 
        manager.fullName &&
        <PageLayout title={`Менеджер: ${manager.fullName}`}>
            <div className='page-managers'>
                <ManagerItem manager={manager} />
            </div>
        </PageLayout>
    )
}

export default ManagerItemPage;