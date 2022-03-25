import React from 'react';
import StatusChecked from '../common/status/StatusChecked';
import {getDateToString} from '../../utils/dates';

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
                        <p>Статус: <span title={user.userStatus.description} 
                            style={{
                               backgroundColor:`#${user.userStatus.color}`,
                               color: `#${user.userStatus.id === 2 ? 'fff' : '000'}`,
                               padding: '0.25rem 1rem',
                               borderRadius: '6px',
                               cursor:'pointer'
                               }}>{user.userStatus.name}</span>
                        </p>
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