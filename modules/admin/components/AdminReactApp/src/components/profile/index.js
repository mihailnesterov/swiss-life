import React from 'react';
import { useSelector } from "react-redux";
import AdminForm from '../admin/AdminForm';
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
                <div className='form-container'>
                    <div className='row'>
                        <AdminForm admin={user} />
                        <ProfileChangePhoto user={user} />
                        <ProfileChangePassword user={user} />
                    </div>
                </div>
            }
        </div>
    )
}

export default ProfilePage;