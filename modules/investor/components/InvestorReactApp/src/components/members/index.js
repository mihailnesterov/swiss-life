import React from 'react';
import { useSelector } from "react-redux";
import MembersList from './MembersList';

const MembersPage = () => {

    const {user, loading} = useSelector( state => state.user);

    return (
        <div className='page-members'>
            {
                user && 
                user.members && 
                user.members.length > 0 &&
                <MembersList members={user.members} loading={loading} />
            }
        </div>
    )
}

export default MembersPage;