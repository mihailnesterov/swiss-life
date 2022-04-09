import React from 'react';
import { useSelector } from "react-redux";
import ProfileChangePhoto from './ProfileChangePhoto';
import ProfileChangePassword from './ProfileChangePassword';
import Spinner from '../common/loader/Spinner';

const ProfilePage = () => {

    const {user, loading} = useSelector( state => state.user);

    return (
        <div className='page-profile'>
            {
                loading ?
                <Spinner size={2} /> :
                <>
                    <ProfileChangePhoto user={user} />
                    <ProfileChangePassword user={user} />
                </>
            }
        </div>
    )
}

export default ProfilePage;