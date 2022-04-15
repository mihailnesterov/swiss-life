import React, {useState} from 'react';
import {getToastSuccess, getToastError} from '../../utils/toasts';
import {updateUser} from '../../api/user';
import Spinner from '../common/loader/Spinner';

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
                .then(res => getToastSuccess('Личные данные сохранены!',res))
                .catch(err => getToastError('Ошибка при сохранении личных данных!',err))
                .finally(() => {
                    setParams(null);
                    setSaving(false);
                });
        }
    }

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmitForm} onChange={handleChangeForm}>
                <h3>Личные данные</h3>
                <div className='row'>
                    <fieldset className='column'>
                        <input 
                            name="firstName"
                            type="text"
                            placeholder='Имя'
                            defaultValue={user.firstName}
                            autoComplete='off'
                        />
                        <input 
                            name="lastName"
                            type="text"
                            placeholder='Фамилия'
                            defaultValue={user.lastName}
                            autoComplete='off'
                        />
                        <input 
                            name="phone"
                            type="text"
                            placeholder='Телефон'
                            defaultValue={user.phone}
                            autoComplete='off'
                        />
                        <input 
                            name="address"
                            type="text"
                            placeholder='Адрес'
                            value={user.address}
                            autoComplete='off'
                        />
                    </fieldset>
                </div>                  
                <fieldset>
                    <button disabled={params ? false : true} type='submit'>Сохранить</button>
                    {saving && <Spinner size={2} />}
                </fieldset>
            </form>
        </div>
    )
}

export default UserForm;