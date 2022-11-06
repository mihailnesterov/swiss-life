import React, {useState} from 'react';
import { useActions } from '../../hooks/useActions';
import {getToastSuccess, getToastError} from '../../utils/toasts';
import {updateUser} from '../../api/user';
import BtnLink from '../common/buttons/BtnLink';
import Spinner from '../common/loader/Spinner';
import { Trans, t } from '@lingui/macro';

const UserForm = (props) => {

    const {user} = props;

    const {fetchUserAuthorizedExpanded} = useActions();

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
                    fetchUserAuthorizedExpanded();
                });
        }
    }

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmitForm} onChange={handleChangeForm}>
                <h3><Trans>Личные данные</Trans></h3>
                <div className='row'>
                    <fieldset className='column'>
                        <label htmlFor="firstName">
                            <span><Trans>Имя</Trans></span>
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
                        </label>
                        <label htmlFor="lastName">
                            <span><Trans>Фамилия</Trans></span>
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
                        </label>
                        <label htmlFor="phone">
                            <span><Trans>Телефон</Trans></span>
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
                        </label>
                        <label htmlFor="email">
                            <span><Trans>Email</Trans></span>
                            <input 
                                name="email"
                                type="text"
                                placeholder={t({
                                    id: 'Email', 
                                    message: 'Email'
                                })}
                                defaultValue={user.email}
                                autoComplete='off'
                            />
                        </label>
                        <label htmlFor="address">
                            <span><Trans>Адрес</Trans></span>
                            <input 
                                name="address"
                                type="text"
                                placeholder={t({
                                    id: 'Адрес', 
                                    message: 'Адрес'
                                })}
                                defaultValue={user.address}
                                autoComplete='off'
                            />
                        </label>
                    </fieldset>
                </div>                  
                <fieldset>
                    <button disabled={params ? false : true} type='submit'><Trans>Сохранить</Trans></button>
                    <BtnLink
                        title={t({
                            id: 'Сменить пароль', 
                            message: 'Сменить пароль'
                        })}
                        resource={`change-password`}
                        className="btn btn-default"
                    />
                    {saving && <Spinner size={2} />}
                </fieldset>
            </form>
        </div>
    )
}

export default UserForm;