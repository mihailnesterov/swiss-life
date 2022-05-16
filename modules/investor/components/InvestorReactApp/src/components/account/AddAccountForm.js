import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import Spinner from '../common/loader/Spinner';
import {createMessage} from '../../api/message';
import {getCurrencies} from '../../api/currency';
import FormSent from '../common/form/FormSent';
import { Trans, t } from '@lingui/macro';

const AddAccountForm = () => {

    const {user, loading} = useSelector( state => state.user);

    const {fetchUserAuthorizedExpanded} = useActions();

    const [sending, setSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [currencies, setCurrencies] = useState(null);
    const [currenciesSelected, setCurrenciesSelected] = useState([]);
    const [userAccounts, setUserAccounts] = useState(null);

    useEffect(() => {
        getCurrencies()
            .then(res => {
                setCurrencies(res.data);
            })
            .catch(err => {
                console.log('get currencies error',err);
            });
        
        return () => {
            setCurrencies(null);
        }
    }, []);
    
    useEffect(() => {
        if(user.accounts && user.accounts.length > 0) {
            setUserAccounts(user.accounts);
        }
        
        return () => {
            setUserAccounts(null);
        }
    }, [user]);

    useEffect(() => {
        if(userAccounts && userAccounts.length > 0) {                         
            userAccounts.forEach(item => {
                setTimeout(() => {
                    const checkbox = document.querySelector(`#account-${item.currency.shortName}`);
                    const label = document.querySelector(`label[for="account-${item.currency.shortName}"]`);
                    
                    if(checkbox) {
                        checkbox.checked = checkbox.disabled = true;
                    }

                    if(label) {
                        label.textContent = `${label.textContent} (${t({id: 'счет №', message: 'счет №'})} ${item.number})`;
                    }
                }, 1000);  
            });
        }
    }, [userAccounts]);

    const onSelectCurrencyHandler = (item, e) => {
        const checked = e.target.checked;
        
        if(checked) {
            if(currenciesSelected.length > 0) {
                setCurrenciesSelected([...new Set([...currenciesSelected, item.shortName])]);
            } else {
                setCurrenciesSelected([item.shortName]);
            }
        } else {
            if(currenciesSelected.length > 0) {
                setCurrenciesSelected(currenciesSelected.filter(curr => curr !== item.shortName));
            } else {
                setCurrenciesSelected([]);
            }
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => {
            createMessage({
                sender_id: user.id,
                receiver_id: user.manager.id,
                theme: t({
                    id: 'Заявка на открытие счета', 
                    message: 'Заявка на открытие счета'
                }),
                text: t({
                    id: `add.account.message`, 
                    message: `id клиента: ${user.id}, ФИО: ${user.fullName}, валюта: ${currenciesSelected. join(',')}`
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
                
                    <h3><Trans>Выберите валюту и отправьте заявку</Trans></h3>

                    <fieldset>
                        {
                            currencies &&
                            currencies.length > 0 &&
                            currencies.map(item => 
                                <div className='checkbox'>
                                    <input 
                                        key={item.id}
                                        type="checkbox" 
                                        id={`account-${item.shortName}`}
                                        onChange={(e) => onSelectCurrencyHandler(item, e)}
                                    />
                                    <label htmlFor={`account-${item.shortName}`}>{item.shortName}</label>
                                </div>
                            )
                        }
                        
                    </fieldset>

                    <hr />

                    <button 
                        type='submit' 
                        disabled={currenciesSelected.length > 0 ? false : true}
                    ><Trans>Отправить заявку</Trans></button>

                </form>
            }
        </div>
    )
}

export default AddAccountForm;