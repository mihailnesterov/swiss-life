import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import {getDateToString} from '../../utils/dates';

const UserInfo = (props) => {

    const {user} = props;

    console.log(user);

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
                    {
                        user.status === 1 ? 
                        <p>
                            <FontAwesomeIcon className='text-green' icon={solid('check')} />
                            Активен
                        </p> :
                        <p>
                            <FontAwesomeIcon className='text-red' icon={solid('xmark')} /> 
                            Отключен
                        </p> 
                    }
                
                    {
                        user.verified === 1 ? 
                        <p>
                            <FontAwesomeIcon className='text-green' icon={solid('check')} />
                            Верифицирован
                        </p> :
                        <p>
                            <FontAwesomeIcon className='text-red' icon={solid('xmark')} />
                            Не верифицирован
                        </p>
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