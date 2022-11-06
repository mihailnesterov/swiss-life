import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import {createTransaction} from '../../api/transaction';
import {createMessage} from '../../api/message';
import Spinner from '../common/loader/Spinner';
import FormSent from '../common/form/FormSent';
import { Trans, t } from '@lingui/macro';

const RepayCreditForm = () => {

    const {user, loading} = useSelector( state => state.user);

    const {fetchUserAuthorizedExpanded} = useActions();

    const [sending, setSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [currencies, setCurrencies] = useState(null);
    const [currencySelected, setCurrencySelected] = useState(null);
    const [accountSelected, setAccountSelected] = useState(null);
    const [currencyName, setCurrencyName] = useState(null);
    const [profit, setProfit] = useState(0);
    const [balance, setBalance] = useState(0);
    const [credit, setCredit] = useState(0);
    const [leverage, setLeverage] = useState(0);

    useEffect(() => {
        if(user.accounts && user.accounts.length > 0) {
            const _currencies = [];
            user.accounts.forEach(item => 
                _currencies.push({
                    ...item.currency, 
                    ...{profit: item.profit},
                    ...{account: item.number},
                    ...{balance: item.balance},
                    ...{credit: item.credit},
                    ...{account_id: item.id}
                })
            );
            setCurrencies(_currencies);
            if(_currencies.length > 0) {
                setCurrencySelected(_currencies[0]);
                setProfit(_currencies[0].profit);
                setBalance(_currencies[0].balance);
                setCredit(_currencies[0].credit);
            }
        }

        return () => {
            setCurrencies(null);
            setCurrencySelected(null);
            setProfit(0);
            setBalance(0);
            setCredit(0);
        }
    }, [user]);

    useEffect(() => {
        if(currencies && currencies.length > 0 && currencyName) {
            const _currencySelected = currencies.filter(item => item.shortName === currencyName);
            if(_currencySelected.length > 0) {
                setCurrencySelected(_currencySelected[0]);
                setProfit(_currencySelected[0].profit); 
                setProfit(_currencySelected[0].balance); 
                setCredit(_currencySelected[0].credit); 
            }
        }

        return () => {
            setCurrencySelected(null);
            setProfit(0);
            setBalance(0);
            setCredit(0);
        }
    }, [currencyName]);

    useEffect(() => {
        if( user && user.userLeverageTotal && user.userLeverageTotal.length > 0 && currencySelected) {
            const _leverageSelected = user.userLeverageTotal.filter(
                item => item.currency === currencySelected.shortName
            );
            if( _leverageSelected.length > 0 ) {
                setLeverage(_leverageSelected[0].total);
            }
        }
        return () => setLeverage(0);
    }, [user, currencySelected]);

    useEffect(() => {
        if(user.accounts && user.accounts.length > 0 && currencySelected) {
            const _accountSelected = user.accounts.filter(
                acc => acc.currency.id === currencySelected.id 
            );
            setAccountSelected(_accountSelected);
        }

        return () => setAccountSelected(null);
    }, [user, currencySelected]);
    
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

        // начислить сумму погашения кредита на счет клиента
        const creditOptions = {
            account_id: accountSelected[0].id,
            manager_id: user.manager.id,
            currency_id: currencySelected.id,
            transaction_type_id: 9,
            sum: Number(inputValue) * (-1),
            description: t({
                id: 'Погашение кредита', 
                message: 'Погашение кредита'
            }),
        };

        // сообщение о погашении кредита от клиента своему менеджеру
        const creditMessageOptions = {
            sender_id: user.id,
            receiver_id: user.manager.id,
            theme: t({
                id: 'Погашение кредита', 
                message: 'Погашение кредита'
            }),
            text: t({
                id: 'add.credit.repay.request', 
                message: `id клиента: ${user.id}, ФИО: ${user.fullName}, сумма: ${currencySelected.sign} ${inputValue}, № счета: ${currencySelected.account}, доступно для погашения кредита: ${currencySelected.sign} ${balance}`
            })
        };

        setTimeout(() => {
            createTransaction(creditOptions)
                .then(res => {
                    console.log('repay credit success', res);

                    createMessage(creditMessageOptions)
                        .then(resMsg => console.log('message success', resMsg))
                        .catch(errMsg => console.error(errMsg));
                })
                .catch(err => {
                    console.error(err);
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
                    fetchUserAuthorizedExpanded();
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
                    id: 'Заявка на погашение кредита отправлена', 
                    message: 'Заявка на погашение кредита отправлена'
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

                    <fieldset>
                        <label htmlFor="repay-credit-sum">
                            <span><Trans>Сумма кредита</Trans></span>
                            <input 
                                id="repay-credit-sum"
                                type='number'
                                min='0'
                                max={credit}
                                className={inputValue > profit ? 'text-red' : null}
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
                            <h3>
                                <small><Trans>Доступно для погашения кредита</Trans>:</small> <span className={profit ? null : 'text-red'}>{currencySelected.sign} {profit}</span>
                                <small><Trans>Сумма кредита</Trans>:</small> <span className={leverage ? null : 'text-red'}>{currencySelected.sign} {leverage}</span>
                            </h3>
                        }
                    </fieldset>

                    <hr />

                    {
                        (inputValue > profit) &&
                        <small className='text-red'><Trans>Сумма превышает максимально доступную</Trans></small>
                    }
                    
                    <fieldset>
                        <button 
                            type='submit' 
                            disabled={((inputValue === '' || inputValue === 0 || inputValue === '0') || (inputValue > profit)) ? true : false}
                        ><Trans>Погасить кредит</Trans></button>
                    </fieldset>
                </form>
            }
        </div>
    )
}

export default RepayCreditForm;