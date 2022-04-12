import React, { useEffect, useState, useRef } from 'react';
import {getCurrencies} from '../../../api/currency';

const AccountsSelectCurrency = (props) => {
    
    const {setParams, params, accounts, currency, setCurrency} = props;

    const [currencies, setCurrencies] = useState(null);

    const [isDropdownListOpen, setDropdownListOpen] = useState(false);

    const [clickedOutside, setClickedOutside] = useState(false);
    const dropdownListRef = useRef();

    useEffect(() => {
        getCurrencies()
            .then(res => setCurrencies(res.data))
            .catch(err => console.log(`get currencies error`, err));
        return () => setCurrencies(null);
    }, []);

    useEffect(() => {
        if(accounts && accounts.length > 0 && currencies && currencies.length > 0) {
            const _codes = accounts.map(acc => acc.currency.code);
            const _currencies = currencies.filter(curr => !_codes.includes(curr.code));
            if(_currencies && _currencies.length > 0) {
                setCurrencies(_currencies);
            }
        }
    }, [accounts, currencies]);

    const handleClickCurrency = () => {
        setClickedOutside(false);
        setDropdownListOpen(true);
    }

    const handleSelectCurrency = item => {
        setCurrency(item);
        setParams({
            ...params,
            'currency_id':Number(item.id),
        });
        setDropdownListOpen(false);
    }

    const onDropdownListClickOutsideHandler = e => {
        if (dropdownListRef.current && !dropdownListRef.current.contains(e.target)) {
            setClickedOutside(true);
        }
    }

    const onDropdownListClickInsideHandler = () => setClickedOutside(false);

    useEffect(() => {
        document.addEventListener('mousedown', onDropdownListClickOutsideHandler);
        return () => document.removeEventListener('mousedown', onDropdownListClickOutsideHandler);
    }, []);

    return (
        <label 
            htmlFor="currencies"
            className='autocomplete'
        >
            <input 
                name='currencies'
                type='text'
                placeholder='Выберите валюту'
                value={currency && currency.name && `${currency.sign} ${currency.shortName}`}
                onClick={handleClickCurrency}
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
                                currencies &&
                                currencies.length > 0 ?
                                currencies.map(item => 
                                    <li 
                                        key={item.id}
                                        onClick={() => handleSelectCurrency(item)}
                                    >
                                        {item.sign} {item.shortName}
                                    </li>
                                ) :
                                <li>Не найдено...</li>
                            }
                        </ul>
                    </div>    
                }
                <input 
                    name='currency_id'
                    type='hidden'
                    placeholder='currency_id'
                    value={currency && currency.id && currency.id}
                    autoComplete='off'
                />
        </label>
    )
}

export default AccountsSelectCurrency;