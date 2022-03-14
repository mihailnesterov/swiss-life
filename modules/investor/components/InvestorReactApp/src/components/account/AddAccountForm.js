import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useActions } from '../../hooks/useActions';
import Spinner from '../common/loader/Spinner';
import {createMessage} from '../../api/message';
import {getCurrencies} from '../../api/currency';
import FormSent from '../common/form/FormSent';

const AddAccountForm = () => {

    const {user, loading} = useSelector( state => state.user);

    const {fetchUserAuthorizedExpanded} = useActions();

    const [sending, setSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [currencies, setCurrencies] = useState(null);
    const [userAccounts, setUserAccounts] = useState(null);

    useEffect(() => {
        getCurrencies()
            .then(res => {
                console.log('get currencies success',res.data);
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
    }, [user,currencies]);

    const checkIfAccountExcists = (currency) => {
        console.log(user.accounts.filter(item => 
            item.currency.code === currencies[0].code
        ).length > 0 ? true : false);

        return userAccounts.filter(item => 
                item.currency.code === currency.code
            ).length > 0 ? true : false;
    }


    const onCurrencySelectHandler = (e) => {
        // доработать, т.к. не тестировалось
        console.log(e);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => {
            createMessage({
                user_id: user.id,
                manager_id: user.manager.id,
                theme: 'Заявка на открытие счета',
                text: `id клиента: ${user.id}, ФИО: ${user.fullName}, валюта: `
            })
                .then(res => {
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
        setIsSent(false);
    }

    //console.log(currencies, userAccounts);

    

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
            <h3>Выберите валюту счета и отправьте заявку</h3>
            {
                (loading || sending) ?
                <Spinner size={2} /> :
                <form onSubmit={onSubmitHandler}>

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
                                        defaultChecked={() => checkIfAccountExcists(item)}
                                        disabled={() => checkIfAccountExcists(item)}
                                        onLoad={() => checkIfAccountExcists(item)}
                                    />
                                    <label for={`account-${item.shortName}`}>{item.shortName}</label>
                                </div>
                            )
                        }
                        
                        
                    </fieldset>

                    <hr />

                    <button 
                        type='submit' 
                        //disabled={((inputValue === '' || inputValue === 0) || (inputValue > balance)) ? true : false}
                    >Отправить заявку</button>

                </form>
            }
        </div>
    )
}

export default AddAccountForm;