import React, { useEffect, useState, useRef } from 'react';
import {getUsersRepresentive, getUser} from '../../../api/user';

const AutocompleteUserRepresentive = (props) => {

    const {user, setParentId} = props;

    const [parent, setParent] = useState(null);
    const [users, setUsers] = useState(null);

    const [isDropdownListOpen, setDropdownListOpen] = useState(false);

    const [clickedOutside, setClickedOutside] = useState(false);
    const dropdownListRef = useRef();

    useEffect(() => {
        getUsersRepresentive({
            'per-page':'5',
        })
            .then(res => setUsers(res.data.users))
            .catch(err => console.log(`get verified users error`, err));
    }, []);

    useEffect(() => {
        if(users && users.length > 0 && user && user.parent_id) {
            getUser(user.parent_id)
                .then(res => setParent(res.data))
                .catch(err => console.log(`get parent by id error`, err));
        }
    }, [users, user]);

    const handleClickUser = () => {
        setClickedOutside(false);
        setDropdownListOpen(true);
    }

    const handleChangeUser = e => {
        const value = e.target.value;
        getUsersRepresentive({
            'per-page':'5',
            'firstName':value,
            'lastName':value,
            'email':value
        })
            .then(res => setUsers(res.data.users))
            .catch(err => console.log(`get representive users error`, err));
    }

    const handleSelectUser = item => {
        setParent(item === '' ? null : item);
        setParentId(item.id);
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
            <p><small>Представитель пользователя</small></p>
            <input 
                name='user'
                type='text'
                placeholder='Выберите представителя'
                value={parent && parent.fullName ? `${parent.fullName} "${parent.email}"` : null}
                onClick={handleClickUser}
                onChange={handleChangeUser}
                autoComplete='off'
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
                    name='parent_id'
                    type='hidden'
                    placeholder='parent_id'
                    value={parent && parent.id && parent.id}
                    autoComplete='off'
                />
        </label>
    )
}

export default AutocompleteUserRepresentive;