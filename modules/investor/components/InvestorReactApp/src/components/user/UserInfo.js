import React from 'react';
import StatusChecked from '../common/status/StatusChecked';
import {getDateToString} from '../../utils/dates';
import UserStatus from '../common/status/UserStatus';
import { Trans, t } from '@lingui/macro';

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
                        textTrue={t({
                            id: 'Активен', 
                            message: 'Активен'
                        })}
                        textFalse={t({
                            id: 'Отключен', 
                            message: 'Отключен'
                        })}
                    />
                    <StatusChecked
                        condition={user.verified}
                        value={1}
                        textTrue={t({
                            id: 'Верифицирован', 
                            message: 'Верифицирован'
                        })}
                        textFalse={t({
                            id: 'Не верифицирован', 
                            message: 'Не верифицирован'
                        })}
                    />
                    {
                        user.representive === 1 &&
                        <StatusChecked
                            condition={user.representive}
                            value={1}
                            textTrue={t({
                                id: 'Представитель', 
                                message: 'Представитель'
                            })}
                            textFalse=''
                        />
                    }
                    {
                        user.userStatus &&
                        user.userStatus.id &&
                        user.userStatus.id > 1 && 
                        <UserStatus 
                            text={`${t({id: 'Статус', message: 'Статус'})}: `}
                            userStatus={user.userStatus} 
                        />
                    }
                {
                    user.created &&
                    <p><Trans>Дата регистрации</Trans>: <b>{getDateToString(user.created)}</b></p>
                }
                
            </div>
        </div>
    )
}

export default UserInfo;