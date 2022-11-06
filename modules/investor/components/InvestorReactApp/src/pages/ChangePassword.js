import React from 'react';
import { useSelector } from "react-redux";
import PageLayoutWithoutTitle from '../layouts/PageLayoutWithoutTitle';
import ProfileChangePassword from '../components/profile/ProfileChangePassword';

const ChangePassword = () => {

    const {user} = useSelector( state => state.user);

    return (
        <PageLayoutWithoutTitle>
            <div className='page-change-password'>
                <ProfileChangePassword user={user} />
            </div>
        </PageLayoutWithoutTitle>
    )
}

export default ChangePassword;