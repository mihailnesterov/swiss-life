import React from 'react';
import { useSelector } from "react-redux";
import Spinner from '../common/loader/Spinner';
import UserForm from '../user/UserForm';
import UserVisits from '../user/UserVisits';
import UserInfo from '../user/UserInfo';
import { Trans } from '@lingui/macro';

const ProfilePage = () => {

    const {user, loading} = useSelector( state => state.user);

    return (
        <div className='page-profile'>
            <h1><Trans>Мой профиль</Trans></h1>
            {
                loading ?
                <Spinner size={2} /> :
                <div>
                    <div>
                        <UserInfo user={user} />
                    </div>
                    <div>
                        <UserForm user={user} />
                        <UserVisits user={user} />
                    </div>
                </div>
            }
        </div>
    )
}

export default ProfilePage;