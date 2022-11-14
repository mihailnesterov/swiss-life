import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import Spinner from '../common/loader/Spinner';
import {createMessage} from '../../api/message';
import FormSent from '../common/form/FormSent';
import BtnLink from '../common/buttons/BtnLink';
import { Trans, t } from '@lingui/macro';

const InvestForm = (props) => {

    const {asset} = props;

    const {user, loading} = useSelector( state => state.user);

    const {fetchUserAuthorizedExpanded} = useActions();

    const [sending, setSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [currencies, setCurrencies] = useState(null);
    const [currencySelected, setCurrencySelected] = useState(null);
    const [currencyName, setCurrencyName] = useState(null);
    //const [profit, setProfit] = useState(0);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        if(user.accounts && user.accounts.length > 0) {
            const _currencies = [];
            user.accounts.forEach(item => 
                _currencies.push({
                    ...item.currency, 
                    //...{profit: item.profit},
                    ...{balance: item.balance},
                    ...{account: item.number}
                })
            );
            setCurrencies(_currencies);
            if(_currencies.length > 0) {
                setCurrencySelected(_currencies[0]);
                //setProfit(_currencies[0].profit);
                setBalance(_currencies[0].balance); 
            }
        }

        return () => {
            setCurrencies(null);
            setCurrencySelected(null);
            //setProfit(0);
            setBalance(0);
        }
    }, [user]);

    useEffect(() => {
        if(currencies && currencies.length > 0 && currencyName) {
            const _currencySelected = currencies.filter(item => item.shortName === currencyName);
            if(_currencySelected.length > 0) {
                setCurrencySelected(_currencySelected[0]);
                //setProfit(_currencySelected[0].profit);
                setBalance(_currencySelected[0].balance);
            }
        }

        return () => {
            setCurrencySelected(null);
            //setProfit(0);
            setBalance(0);
        }
    }, [currencyName]);
    
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
                    id: 'Заявка на инвестирование в актив', 
                    message: 'Заявка на инвестирование в актив'
                }),
                text: t({
                    id: 'asset.invest.request', 
                    message: `id клиента: ${user.id}, ФИО: ${user.fullName}, актив: ${asset.name}, 
                    сумма инвестиций: ${currencySelected.sign} ${inputValue}, № счета: ${currencySelected.account}, сумма текущего баланса: ${currencySelected.sign} ${balance}`
                })
            })
                .then(res => {
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
                    
                    <h2>{asset.name}</h2>

                    <fieldset>
                        <label htmlFor="invest-sum">
                            <span><Trans>Сумма инвестиций</Trans></span>
                            <input 
                                id="invest-sum"
                                type='number'
                                min='0'
                                className={inputValue > balance ? 'text-red' : null}
                                placeholder={`${t({id: 'Сумма', message: 'Сумма'})} ${currencySelected && currencySelected.sign && currencySelected.sign}`}
                                value={inputValue}
                                onChange={onChangeHandler}
                            />
                        </label>
                        
                        {
                            currencies &&
                            currencies.length > 0 &&
                                <label htmlFor="invest-currency-sign">
                                    <span><Trans>Валюта</Trans></span>
                                    <select 
                                        id="invest-currency-sign"
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
                                <small><Trans>Доступно для инвестирования</Trans>:</small> <span className={balance ? null : 'text-red'}>{currencySelected.sign} {balance}</span>
                            </h3>
                        }
                    </fieldset>

                    <hr />

                    {
                        (inputValue > balance) &&
                        <small className='text-red'><Trans>Сумма превышает максимально доступную</Trans></small>
                    }

                    <fieldset>
                        <button 
                            type='submit' 
                            disabled={((inputValue === '' || inputValue === 0 || inputValue === '0') || (inputValue > balance)) ? true : false}
                        ><Trans>Отправить заявку</Trans></button>
                        <BtnLink
                            title={t({
                                id: 'Подробнее', 
                                message: 'Подробнее'
                            })}
                            resource={`investment/${asset.id}`}
                            className="btn btn-default"
                        />
                    </fieldset>
                </form>
            }
        </div>
    )
}

export default InvestForm;