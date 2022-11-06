import React from 'react';
import { Link } from 'react-router-dom';
import StatusChecked from '../common/status/StatusChecked';
import {getDateToString} from '../../utils/dates';
import {BASE_URL} from '../../api';
import { Trans, t } from '@lingui/macro';

const UserInfo = (props) => {

    const {user} = props;

    return (
        <div className='user-info'>
            <div>
                {
                    user.userPhotos &&
                    user.userPhotos.length > 0 ?
                    <Link 
                        to={`${BASE_URL}/change-photo`} 
                        title={t({
                            id: 'Изменить фото', 
                            message: 'Изменить фото'
                        })}
                    >
                        <img 
                            src={user.userPhotos[0].url} 
                            alt={user.userPhotos[0].id} 
                        />
                    </Link> :
                    <Link 
                        to={`${BASE_URL}/change-photo`}
                        className='btn btn-default'
                    >
                        <Trans>Добавить фото</Trans>
                    </Link>
                }
            </div>
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
                    <p className='user-status'><Trans>Статус</Trans>:
                        <span 
                            title={user.userStatus.description} 
                            style={{color:`#${user.userStatus.color}`}}
                        >
                            {user.userStatus.name}
                        </span>
                    </p>
                }
                {
                    user.created &&
                    <p><Trans>Дата регистрации</Trans>: {getDateToString(user.created)}</p>
                }
                {
                    (user.accounts && user.accounts.length > 0) ?
                    <p className='user-accounts'>
                        <Link to={`${BASE_URL}/add-account`}><Trans>Счета</Trans>:</Link>
                        {user.accounts.map(acc => <small><strong>{acc.currency.sign}</strong> {acc.number}</small>)}
                    </p> :
                    <p className='user-accounts'>
                        <Link to={`${BASE_URL}/add-account`}><Trans>Открыть счет</Trans></Link>
                    </p>
                }
            </div>
        </div>
    )
}

export default UserInfo;