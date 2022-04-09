import React from 'react';
import GoBackBtn from '../common/buttons/GoBackBtn';
import ProfileChangePhoto from '../profile/ProfileChangePhoto';
import ProfileChangePassword from '../profile/ProfileChangePassword';
import UserAccounts from './UserAccounts';
import UserForm from './UserForm';
import UserTransactions from './UserTransactions';
import UserDocuments from './UserDocuments';

const UserItem = (props) => {

    const {user} = props;

    return (
        <div className="user-item">
            <div>
                <GoBackBtn
                    url='users'
                    title='В список пользователей'
                />
            </div>
            <div className='form-container'>
                <div className='row'>
                    <UserForm user={user} />
                    <UserAccounts user={user} />
                    <UserTransactions user={user} />
                    <ProfileChangePhoto user={user} />
                    <ProfileChangePassword user={user} />
                    <UserDocuments user={user} />
                </div>
            </div>
        </div>
    )
}

export default UserItem;