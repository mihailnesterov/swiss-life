import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import Spinner from '../common/loader/Spinner';
import {createMessage} from '../../api/message';
import FormSent from '../common/form/FormSent';
import {getUsers} from '../../api/user';

const TransferForm = () => {

    const {user, loading} = useSelector( state => state.user);

    const {fetchUserAuthorizedExpanded} = useActions();

    const [sending, setSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [currencies, setCurrencies] = useState(null);
    const [currencySelected, setCurrencySelected] = useState(null);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        if(user.accounts && user.accounts.length > 0) {
            const _currencies = [];
            user.accounts.forEach(item => 
                _currencies.push({
                    ...item.currency, 
                    ...{balance: item.balance},
                    ...{account: item.number}
                })
            );
            setCurrencies(_currencies);
            if(_currencies.length > 0) {
                setCurrencySelected(_currencies[0]);
                setBalance(_currencies[0].balance);
            }
        }

        return () => {
            setCurrencies(null);
            setCurrencySelected(null);
        }
    }, [user]);
    
    const [inputSearchValue, setInputSearchValue] = useState('');
    const [users, setUsers] = useState(null);
    const [isDropdownListOpen, setIsDropdownListOpen] = useState(false);

    const [clickedOutside, setClickedOutside] = useState(false);
    const dropdownListRef = useRef();

    useEffect(() => {
        if(inputSearchValue !== '') {
            setIsDropdownListOpen(true);
            setClickedOutside(false);
            getUsers({
                email: inputSearchValue,
                firstName: inputSearchValue,
                lastName: inputSearchValue,
            })
            .then(res => {
                setUsers(res.data.filter(item => item.id !== user.id));
            })
            .catch(err => {
                console.log('users search error',err);
            })
        } else {
            setIsDropdownListOpen(false);
        }

        return () => setUsers(null);
    }, [user,inputSearchValue]);

    const onChangeSearchValueHandler = (e) => {
        setInputSearchValue(e.target.value);
    }

    const onClickUsersSearchHandler = () => {
        if(inputSearchValue === '') {
            setClickedOutside(false);
            setIsDropdownListOpen(true);
            getUsers({
                'per-page': '5',
            })
            .then(res => {
                setUsers(res.data.filter(item => item.id !== user.id));
            })
            .catch(err => {
                console.log('users search error',err);
            })
        }
    }

    const [inputValue, setInputValue] = useState(0);

    const onChangeSumHandler = (e) => {
        setInputValue(e.target.value);
    }

    const onCurrencySelectHandler = (e) => {
        // доработать, т.к. не тестировалось с двумя валютами
        console.log(e, currencySelected.sign);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => {
            createMessage({
                user_id: user.id,
                manager_id: user.manager.id,
                theme: 'Заявка на перевод средств другому пользователю',
                text: `id отправителя: ${user.id}, ФИО отправителя: ${user.fullName}, 
                id получателя: ${users[0].id}, ФИО получателя: ${users[0].fullName}, email получателя: ${users[0].email},
                сумма: ${currencySelected.sign} ${inputValue}, № счета: ${currencySelected.account}, баланс счета: ${balance}`
            })
                .then(res => {
                    console.log('message created success', res);
                    fetchUserAuthorizedExpanded();
                })
                .catch(err => {
                    console.log('message create error',err);
                    return(
                        <FormSent 
                            header='Ошибка при подаче заявки!'
                            text={
                                <>
                                    <p>Попробуйте оформить заявку еще раз.</p>
                                    <p>В случае повторной ошибки обратитесь к менеджеру по телефону или электронной почте.</p>
                                </>
                            }
                            onOk={onIsSentHandler}
                        />
                    );
                })
                .finally(() => {
                    setSending(false);
                    setIsSent(true);
                });
        }, 1000);
    }

    const onIsSentHandler = () => {
        setInputValue(0);
        setIsSent(false);
    }

    const onSelectSearchValueHandler = (value) => {
        setInputSearchValue(value);
        setIsDropdownListOpen(false);
    }

    const onDropdownListClickOutsideHandler = e => {
        if (!dropdownListRef.current.contains(e.target)) {
            setClickedOutside(true);
        }
    };

    const onDropdownListClickInsudeHandler = () => setClickedOutside(false);

    useEffect(() => {
        document.addEventListener('mousedown', onDropdownListClickOutsideHandler);
        return () => document.removeEventListener('mousedown', onDropdownListClickOutsideHandler);
    });

    console.log(isDropdownListOpen, users);

    if(isSent) {
        return(
            <FormSent 
                header='Заявка отправлена'
                text={<p>В ближайшее время наш менеджер свяжется с Вами</p>}
                onOk={onIsSentHandler}
            />
        );
    }

    return (
        <div className='form-container'>
            <h3>Заявка на перевод средств другому пользователю</h3>
            {
                (loading || sending) ?
                <Spinner size={2} /> :
                <form onSubmit={onSubmitHandler}>

                    <fieldset>

                        <label 
                            for="transfer-user" 
                            className='autocomplete'
                        >
                            <input 
                                id="transfer-user"
                                type='text'
                                placeholder='Найти получателя'
                                value={inputSearchValue}
                                onChange={onChangeSearchValueHandler}
                                onClick={onClickUsersSearchHandler}
                                style={{ width: "400px" }}
                                autoComplete='off'
                            />
                                {
                                    (isDropdownListOpen && !clickedOutside) &&
                                    <div 
                                        ref={dropdownListRef}
                                        className='autocomplete-items'
                                        onClick={onDropdownListClickInsudeHandler}
                                    >
                                        <ul>
                                            {
                                                users &&
                                                users.length > 0 ?
                                                users.map(item => 
                                                    <li 
                                                        key={item.id}
                                                        onClick={() => onSelectSearchValueHandler(item.email)}
                                                    >
                                                        {item.fullName} "{item.email}"
                                                    </li>
                                                ) :
                                                <li>Не найдено...</li>
                                            }
                                        </ul>
                                    </div>    
                                }
                        </label>

                        <label htmlFor="transfer-sum">
                            <span>Сумма</span>
                            <input 
                                id="transfer-sum"
                                type='number' 
                                className={inputValue > balance ? 'text-red' : null}
                                placeholder={`Сумма ${currencySelected && currencySelected.sign && currencySelected.sign}`}
                                value={inputValue}
                                onChange={onChangeSumHandler}
                            />
                        </label>
                        
                        {
                            currencies &&
                            currencies.length > 0 &&
                                <label htmlFor="transfer-currency-sign">
                                    <span>Валюта</span>
                                    <select 
                                        id="transfer-currency-sign"
                                        onChange={onCurrencySelectHandler}>
                                        {
                                            currencies.map(item => 
                                                <option 
                                                    key={item.code} 
                                                    value={item.shortName}
                                                >
                                                    {item.sign}
                                                </option>
                                            )
                                        }
                                    </select>
                                </label>
                        }
                        {
                            currencySelected && 
                            currencySelected.sign && 
                            balance &&
                            <h3>
                                <small>Баланс:</small> <span>{currencySelected.sign} {balance}</span>
                            </h3>
                        }
                    </fieldset>

                    <hr />

                    {
                        (inputValue > balance) &&
                        <small className='text-red'>Сумма превышает баланс</small>
                    }

                    <button 
                        type='submit' 
                        disabled={(
                            (
                                inputValue === '' || 
                                inputValue === 0 || 
                                inputSearchValue === '' || 
                                !users || 
                                users.length !== 1
                            ) || (inputValue > balance)) ? 
                            true : 
                            false
                        }
                    >Отправить заявку</button>

                </form>
            }
        </div>
    )
}

export default TransferForm;