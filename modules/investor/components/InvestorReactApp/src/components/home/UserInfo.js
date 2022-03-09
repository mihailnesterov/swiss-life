import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
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
                <p>
                    {
                        user.status === 1 ? 
                        <FontAwesomeIcon className='text-green' icon={solid('check')} /> :
                        <FontAwesomeIcon className='text-red' icon={solid('xmark')} />
                    } 
                    Активен
                </p>
                <p>
                    {
                        user.verified === 1 ? 
                        <FontAwesomeIcon className='text-green' icon={solid('check')} /> :
                        <FontAwesomeIcon className='text-red' icon={solid('xmark')} />
                    }
                    Верифицирован
                </p>
                {
                    user.created &&
                    <p>Дата регистрации: <b>{getDateToString(user.created)}</b></p>
                }
                
            </div>
        </div>
    )
}


export default UserInfo;