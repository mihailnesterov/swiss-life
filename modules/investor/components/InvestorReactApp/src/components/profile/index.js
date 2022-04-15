import React from 'react';
import { useSelector } from "react-redux";
import ProfileChangePhoto from './ProfileChangePhoto';
import ProfileChangePassword from './ProfileChangePassword';
import Spinner from '../common/loader/Spinner';
import UserForm from '../user/UserForm';

const ProfilePage = () => {

    const {user, loading} = useSelector( state => state.user);

    return (
        <div className='page-profile'>
            {
                loading ?
                <Spinner size={2} /> :
                <>
                    <UserForm user={user} />
                    <ProfileChangePhoto user={user} />
                    <ProfileChangePassword user={user} />
                </>
            }
        </div>
    )
}

export default ProfilePage;