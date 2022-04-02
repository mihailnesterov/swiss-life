import React from 'react';
import StatusChecked from '../common/status/StatusChecked';
import {getDateToString} from '../../utils/dates';
import UserStatus from '../common/status/UserStatus';

const UserInfo = (props) => {

    const {user} = props;

    return (
        <div>
            {
                user.userPhotos &&
                user.userPhotos.length > 0 &&
                <img 
                    src={user.userPhotos[0].url} 
                    alt={user.userPhotos[0].id} 
                />
            }
            <div>
                <h4>{user.fullName}</h4>
                    <StatusChecked
                        condition={user.status}
                        value={1}
                        textTrue='Активен'
                        textFalse='Отключен'
                    />
                    <StatusChecked
                        condition={user.verified}
                        value={1}
                        textTrue='Верифицирован'
                        textFalse='Не верифицирован'
                    />
                    {
                        user.representive === 1 &&
                        <StatusChecked
                            condition={user.representive}
                            value={1}
                            textTrue='Представитель'
                            textFalse=''
                        />
                    }
                    {
                        user.userStatus &&
                        user.userStatus.id &&
                        user.userStatus.id > 1 && 
                        <UserStatus 
                            text='Статус: ' 
                            userStatus={user.userStatus} 
                        />
                    }
                {
                    user.created &&
                    <p>Дата регистрации: <b>{getDateToString(user.created)}</b></p>
                }
                
            </div>
        </div>
    )
}


export default UserInfo;