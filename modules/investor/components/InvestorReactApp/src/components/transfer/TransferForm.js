import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import Spinner from '../common/loader/Spinner';
import {createMessage} from '../../api/message';
import FormSent from '../common/form/FormSent';
import {getUsers} from '../../api/user';
import { Trans, t } from '@lingui/macro';

const TransferForm = () => {

    const {user, loading} = useSelector( state => state.user);

    const {fetchUserAuthorizedExpanded} = useActions();

    const [sending, setSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [currencies, setCurrencies] = useState(null);
    const [currencySelected, setCurrencySelected] = useState(null);
    const [currencyName, setCurrencyName] = useState(null);
    const [profit, setProfit] = useState(0);

    useEffect(() => {
        if(user.accounts && user.accounts.length > 0) {
            const _currencies = [];
            user.accounts.forEach(item => 
                _currencies.push({
                    ...item.currency, 
                    ...{profit: item.profit},
                    ...{account: item.number}
                })
            );
            setCurrencies(_currencies);
            if(_currencies.length > 0) {
                setCurrencySelected(_currencies[0]);
                setProfit(_currencies[0].profit); 
            }
        }

        return () => {
            setCurrencies(null);
            setCurrencySelected(null);
            setProfit(0);
        }
    }, [user]);

    useEffect(() => {
        if(currencies && currencies.length > 0 && currencyName) {
            const _currencySelected = currencies.filter(item => item.shortName === currencyName);
            if(_currencySelected.length > 0) {
                setCurrencySelected(_currencySelected[0]);
                setProfit(_currencySelected[0].profit); 
            }
        }

        return () => {
            setCurrencySelected(null);
            setProfit(0);
        }
    }, [currencyName]);
    
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
                'email': inputSearchValue,
                'firstName': inputSearchValue,
                'lastName': inputSearchValue,
            })
            .then(res => {
                setUsers(res.data.users.filter(item => item.id !== user.id && item.role === 'user'));
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
                'role':'user',
                'sort':'firstName'
            })
            .then(res => {
                setUsers(res.data.users.filter(item => item.id !== user.id));
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
        setCurrencyName(e.target.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => {
            createMessage({
                sender_id: user.id,
                receiver_id: user.manager.id,
                theme: t({
                    id: 'Заявка на перевод средств другому пользователю', 
                    message: 'Заявка на перевод средств другому пользователю'
                }),
                text: t({
                    id: 'add.transfer.request', 
                    message: `id отправителя: ${user.id}, ФИО отправителя: ${user.fullName}, id получателя: ${users[0].id}, ФИО получателя: ${users[0].fullName}, email получателя: ${users[0].email}, сумма: ${currencySelected.sign} ${inputValue}, № счета: ${currencySelected.account}, сумма накопленных средств: ${currencySelected.sign} ${profit}`
                })
            })
                .then(res => {
                    console.log('message created success', res);
                    fetchUserAuthorizedExpanded();
                })
                .catch(err => {
                    console.log('message create error',err);
                    return(
                        <FormSent 
                            header={t({
                                id: 'Ошибка при подаче заявки!', 
                                message: 'Ошибка при подаче заявки!'
                            })}
                            text={
                                <>
                                    <p><Trans>Попробуйте оформить заявку еще раз.</Trans></p>
                                    <p><Trans>В случае повторной ошибки обратитесь к менеджеру по телефону или электронной почте.</Trans></p>
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
        if (dropdownListRef.current && !dropdownListRef.current.contains(e.target)) {
            setClickedOutside(true);
        }
    };

    const onDropdownListClickInsudeHandler = () => setClickedOutside(false);

    useEffect(() => {
        document.addEventListener('mousedown', onDropdownListClickOutsideHandler);
        return () => document.removeEventListener('mousedown', onDropdownListClickOutsideHandler);
    }, []);

    if(isSent) {
        return(
            <FormSent 
                header={t({
                    id: 'Заявка отправлена', 
                    message: 'Заявка отправлена'
                })}
                text={t({
                    id: 'В ближайшее время наш менеджер свяжется с Вами', 
                    message: 'В ближайшее время наш менеджер свяжется с Вами'
                })}
                onOk={onIsSentHandler}
            />
        );
    }

    return (
        <div className='form-container'>
            {
                (loading || sending) ?
                <Spinner size={2} /> :
                <form onSubmit={onSubmitHandler}>
                
                    <h3><Trans>Заявка на перевод средств другому пользователю</Trans></h3>

                    <fieldset>

                        <label 
                            htmlFor="transfer-user" 
                            className='autocomplete'
                        >
                            <span><Trans>Найти получателя</Trans></span>
                            <input 
                                id="transfer-user"
                                type='text'
                                placeholder={t({
                                    id: 'Введите ФИО или email', 
                                    message: 'Введите ФИО или email'
                                })}
                                value={inputSearchValue}
                                onInput={onChangeSearchValueHandler}
                                onClick={onClickUsersSearchHandler}
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
                                                <li><Trans>Не найдено...</Trans></li>
                                            }
                                        </ul>
                                    </div>    
                                }
                        </label>

                        <label htmlFor="transfer-sum">
                            <span><Trans>Сумма</Trans></span>
                            <input 
                                id="transfer-sum"
                                type='number' 
                                className={inputValue > profit ? 'text-red' : null}
                                placeholder={`${t({
                                    id: 'Сумма', 
                                    message: 'Сумма'
                                })} ${currencySelected && currencySelected.sign && currencySelected.sign}`}
                                value={inputValue}
                                onChange={onChangeSumHandler}
                            />
                        </label>
                        
                        {
                            currencies &&
                            currencies.length > 0 &&
                                <label htmlFor="transfer-currency-sign">
                                    <span><Trans>Валюта</Trans></span>
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
                            profit &&
                            <h3>
                                <small><Trans>Накопленные средства</Trans>:</small> <span>{currencySelected.sign} {profit}</span>
                            </h3>
                        }
                    </fieldset>

                    <hr />

                    {
                        (inputValue > profit) &&
                        <small className='text-red'><Trans>Сумма превышает накопленные средства</Trans></small>
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
                            ) || (inputValue > profit)) ? 
                            true : 
                            false
                        }
                    ><Trans>Отправить заявку</Trans></button>

                </form>
            }
        </div>
    )
}

export default TransferForm;