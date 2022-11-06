import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import Spinner from '../common/loader/Spinner';
import {createTransaction} from '../../api/transaction';
import {createMessage} from '../../api/message';
import FormSent from '../common/form/FormSent';
import { Trans, t } from '@lingui/macro';

const BankTransferForm = () => {

    const {user, loading} = useSelector( state => state.user);

    const {fetchUserAuthorizedExpanded} = useActions();

    const [sending, setSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [currencies, setCurrencies] = useState(null);
    const [currencySelected, setCurrencySelected] = useState(null);
    const [accountSelected, setAccountSelected] = useState(null);
    const [currencyName, setCurrencyName] = useState(null);
    const [profit, setProfit] = useState(0);

    useEffect(() => {
        if(user.accounts && user.accounts.length > 0) {
            const _currencies = [];
            user.accounts.forEach(item => 
                _currencies.push({
                    ...item.currency, 
                    ...{profit: item.profit},
                    ...{account: item.number},
                    ...{account_id: item.id}
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

    const onChangeSumHandler = (e) => {
        setInputValue(e.target.value);
    }

    const [receiverFullName, setReceiverFullName] = useState(null);
    const onChangeReceiverFullNameHandler = (e) => {
        setReceiverFullName(e.target.value);
    }

    const [cardNumber, setCardNumber] = useState(null);
    const onChangeCardNumberHandler = (e) => {
        setCardNumber(e.target.value);
    }

    const onCurrencySelectHandler = (e) => {
        setCurrencyName(e.target.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setSending(true);

        // банковский перевод: списать сумму со счета пользователя
        const senderBankTransferOptions = {
            account_id: accountSelected[0].id,
            manager_id: user.manager.id,
            currency_id: currencySelected.id,
            transaction_type_id: 10, // transaction_type === 10
            sum: (Number(inputValue) * (-1)),
            description: t({
                id: 'Банковский перевод', 
                message: 'Банковский перевод'
            }),
        };

         // сообщение о списании от отправителя своему менеджеру
        const senderMessageOptions = {
            sender_id: user.id,
            receiver_id: user.manager.id,
            theme: t({
                id: 'Заявка на банковский перевод', 
                message: 'Заявка на банковский перевод'
            }),
            text: t({
                id: 'add.bank.transfer.sender.to.manager.request', 
                message: `ФИО отправителя: ${user.fullName}, email отправителя: ${user.email}, ФИО получателя: ${receiverFullName}, номер карты/IBAN: ${cardNumber}, сумма: ${currencySelected.sign} ${inputValue}, № счета отправителя: ${currencySelected.account}, сумма накопленных средств: ${currencySelected.sign} ${profit}`
            })
        };

        setTimeout(() => {
            createTransaction(senderBankTransferOptions)
                .then(resSender => {
                    console.log('bank transfer success', resSender);

                    createMessage(senderMessageOptions)
                        .then(resSenderMsg => console.log('message success', resSenderMsg))
                        .catch(errSenderMsg => console.error(errSenderMsg));

                })
                .catch(errSender => {
                    console.error(errSender);
                    return(
                        <FormSent 
                            header={t({
                                id: 'Ошибка при отправке перевода!', 
                                message: 'Ошибка отправке перевода!'
                            })}
                            text={
                                <>
                                    <p><Trans>Попробуйте оформить перевод еще раз.</Trans></p>
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
                    id: 'Заявка отправлена', 
                    message: 'Заявка отправлена'
                })}
                text={t({
                    id: 'Заявка на банковский перевод отправлена', 
                    message: 'Заявка на банковский перевод отправлена'
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

                        <label htmlFor="transfer-card">
                            <span><Trans>ФИО получателя</Trans></span>
                            <input 
                                id="transfer-name"
                                type='text'
                                placeholder={t({
                                    id: 'Введите ФИО получателя', 
                                    message: 'Введите ФИО получателя'
                                })}
                                value={receiverFullName}
                                onChange={onChangeReceiverFullNameHandler}
                                autoComplete='off'
                            />
                        </label>
                        <label htmlFor="transfer-card">
                            <span><Trans>Номер карты / IBAN</Trans></span>
                            <input 
                                id="transfer-card"
                                type='text'
                                placeholder={t({
                                    id: 'Введите номер карты или IBAN', 
                                    message: 'Введите номер карты или IBAN'
                                })}
                                value={cardNumber}
                                onChange={onChangeCardNumberHandler}
                                autoComplete='off'
                            />
                        </label>

                        <label htmlFor="bank-transfer-sum">
                            <span><Trans>Сумма</Trans></span>
                            <input 
                                id="bank-transfer-sum"
                                type='number' 
                                min='0'
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
                            <label htmlFor="bank-transfer-currency-sign">
                                <span><Trans>Валюта</Trans></span>
                                <select 
                                    id="bank-transfer-currency-sign"
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
                                <small><Trans>Доступно для перевода</Trans>:</small> <span className={profit ? null : 'text-red'}>{currencySelected.sign} {profit}</span>
                            </h3>
                        }
                    </fieldset>

                    <hr />

                    {
                        (inputValue > profit) &&
                        <small className='text-red'><Trans>Сумма превышает максимально доступную</Trans></small>
                    }

                    <button 
                        type='submit' 
                        disabled={((inputValue === '' || inputValue === 0 || inputValue === '0') || (inputValue > profit)) ? true : false}
                    ><Trans>Перевести</Trans></button>

                </form>
            }
        </div>
    )
}

export default BankTransferForm;