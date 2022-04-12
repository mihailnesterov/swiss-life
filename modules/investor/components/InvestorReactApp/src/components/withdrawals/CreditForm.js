import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import Spinner from '../common/loader/Spinner';
import {createMessage} from '../../api/message';
import FormSent from '../common/form/FormSent';

const CreditForm = () => {

    const {user, loading} = useSelector( state => state.user);

    const {fetchUserAuthorizedExpanded} = useActions();

    const [sending, setSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [currencies, setCurrencies] = useState(null);
    const [currencySelected, setCurrencySelected] = useState(null);
    const [profit, setProfit] = useState(0);
    const [balance, setBalance] = useState(0);
    const [mostAccessibleSum, setMostAccessibleSum] = useState(0);

    useEffect(() => {
        if(user.accounts && user.accounts.length > 0) {
            const _currencies = [];
            user.accounts.forEach(item => 
                _currencies.push({
                    ...item.currency, 
                    ...{profit: item.profit},
                    ...{account: item.number},
                    ...{balance: item.balance}
                })
            );
            setCurrencies(_currencies);
            if(_currencies.length > 0) {
                setCurrencySelected(_currencies[0]);
                setProfit(_currencies[0].profit);
                setBalance(_currencies[0].balance);
            }
        }

        return () => {
            setCurrencies(null);
            setCurrencySelected(null);
        }
    }, [user]);

    useEffect(() => {
        setMostAccessibleSum(Math.floor(profit + (balance/2)));
    }, [profit, balance]);
    
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
                sender_id: user.id,
                receiver_id: user.manager.id,
                theme: 'Заявка на кредит',
                text: `id клиента: ${user.id}, ФИО: ${user.fullName}, сумма: ${currencySelected.sign} ${inputValue}, 
                № счета: ${currencySelected.account}, максимальная сумма кредита: ${currencySelected.sign} ${mostAccessibleSum}`
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

    if(isSent) {
        return(
            <FormSent 
                header='Заявка на кредитное плечо отправлена'
                text={<p>Заявка будет рассмотрена в ближайшее время, о резаультатах рассмотрения заявки можете уточнить у администрации сайта</p>}
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

                    <h3>Заявка на кредитное плечо</h3>

                    <fieldset>
                        <label htmlFor="credit-sum">
                            <span>Сумма кредита</span>
                            <input 
                                id="credit-sum"
                                type='number'
                                min='0'
                                className={inputValue > mostAccessibleSum ? 'text-red' : null}
                                placeholder={`Сумма ${currencySelected && currencySelected.sign && currencySelected.sign}`}
                                value={inputValue}
                                onChange={onChangeHandler}
                            />
                        </label>
                        
                        {
                            currencies &&
                            currencies.length > 0 &&
                                <label htmlFor="credit-currency-sign">
                                    <span>Валюта</span>
                                    <select 
                                        id="credit-currency-sign"
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
                                <small>Максимально доступная сумма:</small> <span>{currencySelected.sign} {mostAccessibleSum}</span>
                            </h3>
                        }
                    </fieldset>

                    <hr />

                    {
                        (inputValue > mostAccessibleSum) &&
                        <small className='text-red'>Сумма превышает максимально доступную</small>
                    }

                    <button 
                        type='submit' 
                        disabled={((inputValue === '' || inputValue === 0) || (inputValue > mostAccessibleSum)) ? true : false}
                    >Отправить заявку</button>

                </form>
            }
        </div>
    )
}

export default CreditForm;