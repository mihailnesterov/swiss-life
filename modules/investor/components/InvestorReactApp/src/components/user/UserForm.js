import React, {useState} from 'react';
import {getToastSuccess, getToastError} from '../../utils/toasts';
import {updateUser} from '../../api/user';
import Spinner from '../common/loader/Spinner';
import { Trans, t } from '@lingui/macro';

const UserForm = (props) => {

    const {user} = props;

    const [params, setParams] = useState(null);
    const [saving, setSaving] = useState(false);

    const handleChangeForm = e => {
        const name = e.target.name;
        const value = e.target.value;
        setParams({
            ...params, 
            ...{[name]:value}
        });
    }

    const handleSubmitForm = e => {
        e.preventDefault();
        setSaving(true);
        if(params) {
            updateUser(user.id, params)
                .then(res => getToastSuccess(t({
                    id: 'Личные данные сохранены!', 
                    message: 'Личные данные сохранены!'
                }),res))
                .catch(err => getToastError(t({
                    id: 'Ошибка при сохранении личных данных!', 
                    message: 'Ошибка при сохранении личных данных!'
                }),err))
                .finally(() => {
                    setParams(null);
                    setSaving(false);
                });
        }
    }

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmitForm} onChange={handleChangeForm}>
                <h3><Trans>Личные данные</Trans></h3>
                <div className='row'>
                    <fieldset className='column'>
                        <input 
                            name="firstName"
                            type="text"
                            placeholder={t({
                                id: 'Имя', 
                                message: 'Имя'
                            })}
                            defaultValue={user.firstName}
                            autoComplete='off'
                        />
                        <input 
                            name="lastName"
                            type="text"
                            placeholder={t({
                                id: 'Фамилия', 
                                message: 'Фамилия'
                            })}
                            defaultValue={user.lastName}
                            autoComplete='off'
                        />
                        <input 
                            name="phone"
                            type="text"
                            placeholder={t({
                                id: 'Телефон', 
                                message: 'Телефон'
                            })}
                            defaultValue={user.phone}
                            autoComplete='off'
                        />
                        <input 
                            name="address"
                            type="text"
                            placeholder={t({
                                id: 'Адрес', 
                                message: 'Адрес'
                            })}
                            value={user.address}
                            autoComplete='off'
                        />
                    </fieldset>
                </div>                  
                <fieldset>
                    <button disabled={params ? false : true} type='submit'><Trans>Сохранить</Trans></button>
                    {saving && <Spinner size={2} />}
                </fieldset>
            </form>
        </div>
    )
}

export default UserForm;