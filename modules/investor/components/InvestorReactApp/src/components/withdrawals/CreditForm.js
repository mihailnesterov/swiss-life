import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import Spinner from '../common/loader/Spinner';
import {createMessage} from '../../api/message';
import FormSent from '../common/form/FormSent';
import { Trans, t } from '@lingui/macro';

const CreditForm = () => {

    const {user, loading} = useSelector( state => state.user);

    const {fetchUserAuthorizedExpanded} = useActions();

    const [sending, setSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [currencies, setCurrencies] = useState(null);
    const [currencySelected, setCurrencySelected] = useState(null);
    const [currencyName, setCurrencyName] = useState(null);
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
            setProfit(0);
            setBalance(0);
        }
    }, [user]);

    useEffect(() => {
        if(currencies && currencies.length > 0 && currencyName) {
            const _currencySelected = currencies.filter(item => item.shortName === currencyName);
            if(_currencySelected.length > 0) {
                setCurrencySelected(_currencySelected[0]);
                setProfit(_currencySelected[0].profit); 
                setProfit(_currencySelected[0].balance); 
            }
        }

        return () => {
            setCurrencySelected(null);
            setProfit(0);
            setBalance(0);
        }
    }, [currencyName]);

    useEffect(() => {
        setMostAccessibleSum(Math.floor(profit + (balance/2)));
    }, [profit, balance]);
    
    const [inputValue, setInputValue] = useState(0);

    const onChangeHandler = (e) => {
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
                    id: 'Заявка на кредит', 
                    message: 'Заявка на кредит'
                }),
                text: t({
                    id: 'add.credit.request', 
                    message: `id клиента: ${user.id}, ФИО: ${user.fullName}, сумма: ${currencySelected.sign} ${inputValue}, № счета: ${currencySelected.account}, максимальная сумма кредита: ${currencySelected.sign} ${mostAccessibleSum}`
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

    if(isSent) {
        return(
            <FormSent 
                header={t({
                    id: 'Заявка на кредитное плечо отправлена', 
                    message: 'Заявка на кредитное плечо отправлена'
                })}
                text={t({
                    id: 'Заявка будет рассмотрена в ближайшее время, о резаультатах рассмотрения заявки можете уточнить у администрации сайта', 
                    message: 'Заявка будет рассмотрена в ближайшее время, о резаультатах рассмотрения заявки можете уточнить у администрации сайта'
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

                    <h3><Trans>Заявка на кредитное плечо</Trans></h3>

                    <fieldset>
                        <label htmlFor="credit-sum">
                            <span><Trans>Сумма кредита</Trans></span>
                            <input 
                                id="credit-sum"
                                type='number'
                                min='0'
                                className={inputValue > mostAccessibleSum ? 'text-red' : null}
                                placeholder={`${t({id: 'Сумма', message: 'Сумма'})} ${currencySelected && currencySelected.sign && currencySelected.sign}`}
                                value={inputValue}
                                onChange={onChangeHandler}
                            />
                        </label>
                        
                        {
                            currencies &&
                            currencies.length > 0 &&
                                <label htmlFor="credit-currency-sign">
                                    <span><Trans>Валюта</Trans></span>
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
                                <small><Trans>Максимально доступная сумма</Trans>:</small> <span>{currencySelected.sign} {mostAccessibleSum}</span>
                            </h3>
                        }
                    </fieldset>

                    <hr />

                    {
                        (inputValue > mostAccessibleSum) &&
                        <small className='text-red'><Trans>Сумма превышает максимально доступную</Trans></small>
                    }

                    <button 
                        type='submit' 
                        disabled={((inputValue === '' || inputValue === 0) || (inputValue > mostAccessibleSum)) ? true : false}
                    ><Trans>Отправить заявку</Trans></button>

                </form>
            }
        </div>
    )
}

export default CreditForm;