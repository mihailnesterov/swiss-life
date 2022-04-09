import React, { useEffect, useState, useRef } from 'react';
import {getUsersVerified, getUser} from '../../../api/user';

const AutocompleteUser = (props) => {

    const {transaction, setUserId} = props;

    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(null);

    const [isDropdownListOpen, setDropdownListOpen] = useState(false);

    const [clickedOutside, setClickedOutside] = useState(false);
    const dropdownListRef = useRef();

    useEffect(() => {
        getUsersVerified({
            'per-page':'5',
        })
            .then(res => setUsers(res.data.users))
            .catch(err => console.log(`get verified users error`, err));
    }, []);

    useEffect(() => {
        if(users && users.length > 0 && transaction && transaction.user && transaction.user.id) {
            getUser(transaction.user.id)
                .then(res => setUser(res.data))
                .catch(err => console.log(`get user by id error`, err));
        }
    }, [users, transaction]);

    const handleClickUser = () => {
        setClickedOutside(false);
        setDropdownListOpen(true);
    }

    const handleChangeUser = e => {
        const value = e.target.value;
        getUsersVerified({
            'per-page':'5',
            'firstName':value,
            'lastName':value,
            'email':value
        })
            .then(res => setUsers(res.data.users))
            .catch(err => console.log(`get verified users error`, err));
    }

    const handleSelectUser = item => {
        setUser(item === '' ? null : item);
        setUserId(item.id);
        setDropdownListOpen(false);
    }

    const onDropdownListClickOutsideHandler = e => {
        if (dropdownListRef.current && !dropdownListRef.current.contains(e.target)) {
            setClickedOutside(true);
        }
    };

    const onDropdownListClickInsideHandler = () => setClickedOutside(false);

    useEffect(() => {
        document.addEventListener('mousedown', onDropdownListClickOutsideHandler);
        return () => document.removeEventListener('mousedown', onDropdownListClickOutsideHandler);
    }, []);

    return (
        <label 
            htmlFor="user"
            className='autocomplete'
        >
            <p><small>Пользователь</small></p>
            <input 
                name='user'
                type='text'
                placeholder='Выберите пользователя'
                value={user && user.fullName ? `${user.fullName} "${user.email}"` : null}
                onClick={handleClickUser}
                onChange={handleChangeUser}
                autoComplete='off'
                required={true}
            />
                {
                    (isDropdownListOpen && !clickedOutside) &&
                    <div 
                        ref={dropdownListRef}
                        className='autocomplete-items'
                        onClick={onDropdownListClickInsideHandler}
                    >
                        <ul>
                            {
                                users &&
                                users.length > 0 ?
                                users.map(item => 
                                    <li 
                                        key={item.id}
                                        onClick={() => handleSelectUser(item)}
                                    >
                                        {item.fullName} "{item.email}"
                                    </li>
                                ) :
                                <li>Не найдено...</li>
                            }
                        </ul>
                    </div>    
                }
                <input 
                    name='user_id'
                    type='hidden'
                    placeholder='text_id'
                    value={user && user.id && user.id}
                    autoComplete='off'
                />
        </label>
    )
}

export default AutocompleteUser;