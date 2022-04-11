import React from 'react';
import GoBackBtn from '../common/buttons/GoBackBtn';
import ProfileChangePhoto from '../profile/ProfileChangePhoto';
import ProfileChangePassword from '../profile/ProfileChangePassword';
import AdminForm from './AdminForm';

const AdminItem = (props) => {

    const {admin} = props;

    return (
        <div className="admin-item">
            <div>
                <GoBackBtn
                    url=''
                    title='В список администраторов'
                />
            </div>
            <div className='form-container'>
                <div className='row'>
                    <AdminForm admin={admin} />
                    <ProfileChangePhoto user={admin} />
                    <ProfileChangePassword user={admin} />
                </div>
            </div>
        </div>
    )
}

export default AdminItem;