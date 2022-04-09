import React, {useEffect} from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import UsersList from './UsersList';
import Spinner from '../common/loader/Spinner';

const UsersPage = () => {

    const {user} = useSelector( state => state.user);
    const {users, links, meta, loading} = useSelector( state => state.users);

    const {fetchUsersOfAuthorizedManagerExpanded} = useActions();

    useEffect(() => {
        fetchUsersOfAuthorizedManagerExpanded();
    },[]);

    return (
        <div className='page-users'>
            {
                loading ?
                <Spinner size={2} /> :
                <UsersList 
                    user={user} 
                    users={users} 
                    links={links} 
                    meta={meta} 
                />
            }
        </div>
    )
}

export default UsersPage;