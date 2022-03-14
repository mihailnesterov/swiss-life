import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import Spinner from '../common/loader/Spinner';
import {createMessage} from '../../api/message';

const WithdrawalsForm = () => {

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
    
    const [inputValue, setInputValue] = useState(0);

    const onChangeHandler = (e) => {
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
                theme: 'Заявка на вывод средств',
                text: `id клиента: ${user.id}, ФИО: ${user.fullName}, сумма: ${currencySelected.sign} ${inputValue}, № счета: ${currencySelected.account}, баланс счета: ${balance}`
            })
                .then(res => {
                    console.log('message created success', res);
                    fetchUserAuthorizedExpanded();
                })
                .catch(err => {
                    console.log('message create error',err);
                    return(
                        <div className='withdrawal-sent'>
                            <h3>Ошибка при подаче заявки!</h3>
                            <p>Попробуйте оформить заявку еще раз.</p>
                            <p>В случае повторной ошибки обратитесь к менеджеру по телефону или электронной почте.</p>
                            <button onClick={onIsSentHandler}>Ок</button>
                        </div>
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

    if(isSent) {
        return(
            <div className='withdrawal-sent'>
                <h3>Заявка отправлена</h3>
                <p>В ближайшее время наш менеджер свяжется с Вами</p>
                <button onClick={onIsSentHandler}>Ок</button>
            </div>
        );
    }

    return (
        <div className='withdrawal-form'>
            <h3>Заявка на вывод средств</h3>
            {
                (loading || sending) ?
                <Spinner size={2} /> :
                <form onSubmit={onSubmitHandler}>

                    <fieldset>
                        <label for="withdrawal-sum">
                            <span>Сумма</span>
                            <input 
                                id="withdrawal-sum"
                                type='number' 
                                className={inputValue > balance ? 'text-red' : null}
                                placeholder={`Сумма ${currencySelected && currencySelected.sign && currencySelected.sign}`}
                                value={inputValue}
                                onChange={onChangeHandler}
                            />
                        </label>
                        
                        {
                            currencies &&
                            currencies.length > 0 &&
                                <label for="withdrawal-currency-sign">
                                    <span>Валюта</span>
                                    <select 
                                        id="withdrawal-currency-sign"
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
                        disabled={((inputValue === '' || inputValue === 0) || (inputValue > balance)) ? true : false}
                    >Отправить заявку</button>

                </form>
            }
        </div>
    )
}


export default WithdrawalsForm;