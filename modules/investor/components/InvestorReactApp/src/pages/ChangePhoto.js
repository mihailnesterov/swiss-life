import React from 'react';
import { useSelector } from "react-redux";
import PageLayoutWithoutTitle from '../layouts/PageLayoutWithoutTitle';
import ProfileChangePhoto from '../components/profile/ProfileChangePhoto';

const ChangePhoto = () => {

    const {user} = useSelector( state => state.user);

    return (
        <PageLayoutWithoutTitle>
            <div className='page-change-photo'>
                <ProfileChangePhoto user={user} />
            </div>
        </PageLayoutWithoutTitle>
    )
}

export default ChangePhoto;