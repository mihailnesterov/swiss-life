import React from 'react';
import { useSelector } from "react-redux";
import MembersList from './MembersList';
import YouCanNotAddMembers from './YouCanNotAddMembers';
import Spinner from '../common/loader/Spinner';

const MembersPage = () => {

    const {user, loading} = useSelector( state => state.user);

    return (
        <div className='page-members'>
            {
                user && 
                user.members && 
                user.members.length > 0 &&
                user.representive === 1 ?
                <MembersList members={user.members} loading={loading} /> :
                loading ? 
                <Spinner size={2} /> : 
                <YouCanNotAddMembers />
            }
        </div>
    )
}

export default MembersPage;