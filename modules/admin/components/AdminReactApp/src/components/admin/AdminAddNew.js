import React, {useState} from 'react';
import { useActions } from '../../hooks/useActions';
import {getToastSuccess, getToastError} from '../../utils/toasts';
import {createUser} from '../../api/user';

const AdminAddNew = (props) => {
    
    const {onOpen} = props;

    const {fetchRoleAdminExpanded} = useActions();

    const [params, setParams] = useState(null);

    const handleChangeForm = e => {
        const name = e.target.name;
        const value = e.target.value;
        if(value === '') {
            setParams(null);
        } else {
            setParams({
                role: 'admin',
                ...params, 
                ...{[name]:value}
            });
        }
    }

    const handleSubmitForm = e => {
        e.preventDefault();
        createUser(params)
            .then(res => {
                fetchRoleAdminExpanded();
                getToastSuccess('Администратор добавлен!',res);
            })
            .catch(err => getToastError('Ошибка при добавлении администратора!',err))
            .finally(() => setParams(null));
    }

    return (
        <form
            onSubmit={handleSubmitForm} 
            onChange={handleChangeForm} 
            className='users-add-form'
        >
            <input 
                name="firstName"
                type="text"
                placeholder='Введите имя'
                autoComplete='off'
                required={true}
            />
            <input 
                name="lastName"
                type="text"
                placeholder='Введите фамилию'
                autoComplete='off'
                required={true}
                style={{textAlign:"left"}}
            />
            <input 
                name="email"
                type="email"
                placeholder='Введите email'
                autoComplete='off'
                required={true}
            />
            <button disabled={params ? false : true} type='submit'>Добавить</button>
            <button type='button' onClick={onOpen}>Отмена</button>
            <div></div>
            <div></div>
        </form>
    )
}

export default AdminAddNew;