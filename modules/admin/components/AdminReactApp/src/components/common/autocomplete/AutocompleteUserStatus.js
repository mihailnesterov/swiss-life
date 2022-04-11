import React, { useEffect, useState, useRef } from 'react';
import {getStatuses, getStatus} from '../../../api/status';

const AutocompleteUserStatus = (props) => {

    const {user, setStatusId} = props;

    const [statuses, setStatuses] = useState(null);
    const [status, setStatus] = useState(null);

    const [isDropdownListOpen, setDropdownListOpen] = useState(false);

    const [clickedOutside, setClickedOutside] = useState(false);
    const dropdownListRef = useRef();

    useEffect(() => {
        getStatuses()
            .then(res => setStatuses(res.data))
            .catch(err => console.log(`get statuses error`, err));
    }, []);

    useEffect(() => {
        if(statuses && statuses.length > 0 && user && user.status_id) {
            getStatus(user.status_id)
                .then(res => setStatus(res.data))
                .catch(err => console.log(`get status by id error`, err));
        }
    }, [statuses, user]);

    const handleClickStatus = () => {
        setClickedOutside(false);
        setDropdownListOpen(true);
    }

    const handleSelectStatus = item => {
        setStatus(item);
        setStatusId(item.id);
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
            htmlFor="user-statuses"
            className='autocomplete'
        >
            <p><small>Статус пользователя</small></p>
            <input 
                name='user-statuses'
                type='text'
                placeholder='Выберите статус'
                value={status && status.name ? status.name : null}
                onClick={handleClickStatus}
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
                                statuses &&
                                statuses.length > 0 ?
                                statuses.map(item => 
                                    <li 
                                        key={item.id}
                                        onClick={() => handleSelectStatus(item)}
                                    >
                                        {item.name}
                                    </li>
                                ) :
                                <li>Не найдено...</li>
                            }
                        </ul>
                    </div>    
                }
                <input 
                    name='status_id'
                    type='hidden'
                    placeholder='status_id'
                    value={status && status.id && status.id}
                    autoComplete='off'
                />
        </label>
    )
}

export default AutocompleteUserStatus;