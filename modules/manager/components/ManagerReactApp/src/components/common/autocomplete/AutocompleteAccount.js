import React, { useEffect, useState, useRef } from 'react';
import {getAccounts} from '../../../api/account';

const AutocompleteAccount = (props) => {

    const {transaction, setParams, params, userId, setCurrency} = props;

    const [account, setAccount] = useState(null);
    const [userAccounts, setUserAccounts] = useState(null);

    const [isDropdownListOpen, setDropdownListOpen] = useState(false);

    const [clickedOutside, setClickedOutside] = useState(false);
    const dropdownListRef = useRef();

    useEffect(() => {
        if(transaction) {

            const id = userId ? 
                userId : 
                (transaction.user && transaction.user.id) ? 
                transaction.user.id : 
                null;
            
            if(id) {
                getAccounts({'user_id':id})
                    .then(res => setUserAccounts(res.data.accounts))
                    .catch(err => console.log(`get user's accounts error`, err));
            } else {
                setUserAccounts(null);
            }
        }

        return () => setUserAccounts(null);
    }, [transaction, userId]);

    useEffect(() => {
        if(userAccounts && userAccounts.length > 0) {
            const _account = userAccounts.filter(item => item.id === transaction.account_id);
            setAccount(_account.length > 0 && _account[0]);
        } else {
            setAccount(null);
        }

        return () => setAccount(null);
    }, [userAccounts, transaction]);

    useEffect(() => {
        if(account && account.currency) {
            setCurrency(account.currency);
        }
        return () => setCurrency(null);
    }, [account]);

    const handleClickAccount = () => {
        setClickedOutside(false);
        setDropdownListOpen(true);
    }

    const handleSelectAccount = item => {
        setAccount(item);
        setParams({
            'account_id':Number(item.id),
            ...params
        });
        setCurrency(item.currency ? item.currency : null);
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
            htmlFor="user-accounts"
            className='autocomplete'
        >
            <p><small>Счет</small></p>
            <input 
                name='user-accounts'
                type='text'
                placeholder='Выберите счет'
                value={(account && account.number) ? `${account.number} (${account.currency.shortName})` : ''}
                onClick={handleClickAccount}
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
                                userAccounts &&
                                userAccounts.length > 0 ?
                                userAccounts.map(item => 
                                    <li 
                                        key={item.id}
                                        onClick={() => handleSelectAccount(item)}
                                    >
                                        {item.number} ({item.currency.shortName})
                                    </li>
                                ) :
                                <li>Не найдено...</li>
                            }
                        </ul>
                    </div>    
                }
                <input 
                    name='account_id'
                    type='hidden'
                    placeholder='account_id'
                    value={(account && account.id) ? account.id : ''}
                    autoComplete='off'
                />
        </label>
    )
}

export default AutocompleteAccount;