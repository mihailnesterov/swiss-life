import React from 'react';
import { useSelector } from "react-redux";
import MembersList from './MembersList';
import MembersForm from './MembersForm';
import YouCanNotAddMembers from './YouCanNotAddMembers';
import Spinner from '../common/loader/Spinner';

const MembersPage = () => {

    const {user, loading} = useSelector( state => state.user);

    return (
        loading ?
        <Spinner size={2} /> :
        
        <div className='page-members'>
            {
                user.representive === 1 ?
                <>
                    <MembersForm />
                    {
                        user.members && 
                        user.members.length > 0 &&
                        <MembersList members={user.members} />
                    }
                </> :
                <YouCanNotAddMembers />
            }
        </div>
    )
}

export default MembersPage;