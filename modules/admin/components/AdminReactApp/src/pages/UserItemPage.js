import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useActions } from '../hooks/useActions';
import PageLayout from '../layouts/PageLayout';
import UserItem from '../components/user/UserItem';
import Spinner from '../components/common/loader/Spinner';

const UserItemPage = () => {
    
    const {id} = useParams();

    const {users, loading} = useSelector( state => state.users);

    const {fetchUserExpanded} = useActions();

    useEffect(() => {
        fetchUserExpanded(parseInt(id));
    },[id]);

    if(loading) {
        return(
            <div className='m-1'>
                <Spinner size={2} />
            </div>
        );
    }

    return (
        users && 
        users.length > 0 &&
        <PageLayout title={`Пользователь: ${users[0].fullName}`}>
            <div className='page-users'>
                <UserItem user={users[0]} />
            </div>
        </PageLayout>
    )
}

export default UserItemPage;