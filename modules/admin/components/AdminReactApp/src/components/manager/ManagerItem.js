import React from 'react';
import GoBackBtn from '../common/buttons/GoBackBtn';
import ProfileChangePhoto from '../profile/ProfileChangePhoto';
import ProfileChangePassword from '../profile/ProfileChangePassword';
import ManagerForm from './ManagerForm';

const ManagerItem = (props) => {

    const {manager} = props;

    return (
        <div className="manager-item">
            <div>
                <GoBackBtn
                    url='managers'
                    title='В список менеджеров'
                />
            </div>
            <div className='form-container'>
                <div className='row'>
                    <ManagerForm manager={manager} />
                    <ProfileChangePhoto user={manager} />
                    <ProfileChangePassword user={manager} />
                </div>
            </div>
        </div>
    )
}

export default ManagerItem;