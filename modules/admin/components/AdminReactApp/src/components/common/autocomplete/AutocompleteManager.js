import React, { useEffect, useState, useRef } from 'react';
import {getRoleManager, getUser} from '../../../api/user';

const AutocompleteManager = (props) => {

    const {user, setManagerId} = props;

    const [manager, setManager] = useState(null);
    const [managers, setManagers] = useState(null);

    const [isDropdownListOpen, setDropdownListOpen] = useState(false);

    const [clickedOutside, setClickedOutside] = useState(false);
    const dropdownListRef = useRef();

    useEffect(() => {
        getRoleManager({
            'per-page':'5',
        })
            .then(res => setManagers(res.data.users))
            .catch(err => console.log(`get managers error`, err));
    }, []);

    useEffect(() => {
        if(user && user.manager && user.manager.id) {
            getUser(user.manager.id)
                .then(res => setManager(res.data))
                .catch(err => console.log(`get manager by id error`, err));
        }
    }, [user]);

    const handleClickUser = () => {
        setClickedOutside(false);
        setDropdownListOpen(true);
    }

    const handleSelectUser = item => {
        setManager(item === '' ? null : item);
        setManagerId(item.id);
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
            htmlFor="manager"
            className='autocomplete'
        >
            <p><small>Менеджер</small></p>            
            <input 
                name='manager'
                type='text'
                placeholder='Выберите менеджера'
                value={manager && manager.fullName ? `${manager.fullName} "${manager.email}"` : null}
                onClick={handleClickUser}
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
                                managers &&
                                managers.length > 0 ?
                                managers.map(item => 
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
                    name='manager_id'
                    type='hidden'
                    placeholder='manager_id'
                    value={manager && manager.id && manager.id}
                    autoComplete='off'
                />
        </label>
    )
}

export default AutocompleteManager;