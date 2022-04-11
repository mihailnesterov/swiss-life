import React, {useState} from 'react';
import {getToastSuccess, getToastError} from '../../utils/toasts';
import {updateUser} from '../../api/user';
import Spinner from '../common/loader/Spinner';

const ManagerForm = (props) => {

    const {manager} = props;

    const [params, setParams] = useState(null);
    const [saving, setSaving] = useState(false);

    const handleChangeForm = e => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? (e.target.checked === true ? 1 : 0) : e.target.value;
        const excludeFields = [
            'user',
            'user-statuses',
            'manager'
        ];
        
        if(excludeFields.filter(item => item === name).length > 0) {
            setParams({...params});
        } else {
            setParams({
                ...params, 
                ...{[name]:value}
            });
        } 
    }

    const handleSubmitForm = e => {
        e.preventDefault();
        setSaving(true);
        if(params) {
            updateUser(manager.id, params)
                .then(res => getToastSuccess('Менеджер сохранен!',res))
                .catch(err => getToastError('Ошибка при сохранении менеджера!',err))
                .finally(() => {
                    setParams(null);
                    setSaving(false);
                });
        }
    }

    return (
        <form onSubmit={handleSubmitForm} onChange={handleChangeForm}>
            <div className='row'>
                <fieldset className='column'>
                    <input 
                        name="firstName"
                        type="text"
                        placeholder='Имя'
                        defaultValue={manager.firstName}
                        autoComplete='off'
                    />
                    <input 
                        name="lastName"
                        type="text"
                        placeholder='Фамилия'
                        defaultValue={manager.lastName}
                        autoComplete='off'
                    />
                    <input 
                        name="email"
                        type="email"
                        placeholder='Email'
                        defaultValue={manager.email}
                        autoComplete='off'
                    />
                    <input 
                        name="phone"
                        type="text"
                        placeholder='Телефон'
                        defaultValue={manager.phone}
                        autoComplete='off'
                    />
                    <input 
                        name="address"
                        type="text"
                        placeholder='Адрес'
                        value={manager.address}
                        autoComplete='off'
                    />
                    <div className='checkbox'>
                        <input  
                            name="status"
                            type="checkbox"
                            defaultChecked={manager.status} 
                        />
                        <label htmlFor="status">Активен</label>
                    </div>
                </fieldset>
            </div>                  
            <fieldset>
                <button disabled={params ? false : true} type='submit'>Сохранить</button>
                {saving && <Spinner size={2} />}
            </fieldset>
        </form>
    )
}

export default ManagerForm;