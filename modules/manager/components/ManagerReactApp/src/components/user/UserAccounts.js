import React, {useState, useEffect, useCallback} from 'react';
import InputAccountNumber from '../common/form/InputAccountNumber';
import {getCurrencies} from '../../api/currency';
import {createAccount} from '../../api/account';
import Spinner from '../common/loader/Spinner';

const AccountsList = (props) => {
    
    const {accounts} = props;
    
    return(
        accounts &&
        accounts.length > 0 &&
        <ul>
            {
                accounts.map((acc,i) => 
                    <li key={acc.id}>
                        <span>{i+1}. {acc.number}</span>
                        <span>{acc.currency.sign} ({acc.currency.shortName})</span>
                    </li>
                )
            }
        </ul>
    );
}

const AccountOpenBtn = (props) => {

    const {accounts, setOpenAccount} = props;

    const handleOpenAccount = () => setOpenAccount(true);

    return(
        <button 
            type='button' 
            onClick={handleOpenAccount}
            disabled={accounts && accounts.length >= 2 ? true : false}
            >+ Открыть счет
        </button>
    );
}

const AccountCloseBtn = (props) => {

    const {setOpenAccount} = props;

    const handleCloseAccount = () => setOpenAccount(false);

    return(
        <button 
            type='button' 
            onClick={handleCloseAccount}
            >Отмена
        </button>
    );
}

const SelectCurrency = (props) => {

    const {accounts, setCurrencyId, setCurrencyCode, setAccountNumber} = props;

    const [currencies, setCurrencies] = useState(null);

    useEffect(() => {
        getCurrencies()
            .then(res => {
                const accountCurrencyCodes = accounts && accounts.length > 0 ? 
                    accounts.map(acc => acc.currency.code)
                    : null;
                setCurrencies(
                    accountCurrencyCodes ?
                    res.data.filter(curr => !accountCurrencyCodes.includes(curr.code)) :
                    res.data
                );
            })
            .catch(err => console.log(err))
        return () => setCurrencies(null);
    }, [accounts]);

    /*useEffect(() => {
        if(currencies && currencies.length > 0) {
            setCurrencyCode(currencies[0].code);
            setCurrencyId(currencies[0].id);
        }

        return () => {
            setCurrencyCode(null);
            setCurrencyId(null);
        }
    }, [currencies]);*/

    const handleCurrencyIdSelect = e => {
        const id = Number(e.target.value);
        if(id > 0) {
            setCurrencyId(id);
            setCurrencyCode(currencies.filter(curr => curr.id === id)[0].code); 
        } else {
            setCurrencyId(null);
            setCurrencyCode(null);
        }
        setAccountNumber(null);
    };

    return(
        currencies &&
        currencies.length > 0 &&
        <label htmlFor="currency_id">
            <select 
                id="currency_id"
                name="currency_id"
                onChange={handleCurrencyIdSelect}>
                <option value={0}>Выберите валюту</option>  
            {
                currencies.map(item => 
                    <option key={item.id} value={item.id}>
                        {item.sign} ({item.shortName})
                    </option>
                )
            }
            </select>
        </label>
    );
}

const UserAccounts = (props) => {

    const {user} = props;

    const [accounts, setAccounts] = useState(null);

    useEffect(() => {
        if( user.accounts && user.accounts.length > 0 ) {
            setAccounts(user.accounts);
        }
    }, [user]);

    const [isOpenAccount, setOpenAccount] = useState(false);
    const [accountNumber, setAccountNumber] = useState(null);
    const [currencyId, setCurrencyId] = useState(null);
    const [currencyCode, setCurrencyCode] = useState(null);
    const [params, setParams] = useState(null);
    const [saving, setSaving] = useState(false);

    const handleSubmitForm = e => {
        e.preventDefault();
        setSaving(true);
        if(params) {
            console.log(1000,params,accountNumber,currencyCode,currencyId);
            setSaving(false);
            /*createAccount(params)
                .then(res => getToastSuccess('Счет создан!',res))
                .catch(err => getToastError('Ошибка при создании счета!',err))
                .finally(() => {
                    setParams(null);
                    setSaving(false);
                });*/
        }
    }

    const handleChangeForm = useCallback(e => {
        const name = e.target.name;
        const value = e.target.name === 'currency_id' ? Number(e.target.value) : e.target.value;

        if(accountNumber && 
            currencyCode && 
            currencyId && 
            currencyId > 0) {
            
            setParams({
                user_id: user.id,
                number: accountNumber,
                ...params, 
                ...{[name]:value}
            });

        } else {
            setParams(null);
        }

        console.log(2,params,accountNumber,currencyCode,currencyId);
    }, [accountNumber, currencyCode, currencyId]);

    //console.log(1,params,accountNumber,currencyCode,currencyId);

    return (
        <form onSubmit={handleSubmitForm} onChange={handleChangeForm}>
            <h3>Счета</h3>
            <AccountsList accounts={accounts} />
            {
                !isOpenAccount && 
                <AccountOpenBtn 
                    accounts={accounts} 
                    setOpenAccount={setOpenAccount} 
                />
            }
            {
                isOpenAccount &&
                <>
                    <fieldset className='column'>
                        <SelectCurrency 
                            accounts={accounts} 
                            setCurrencyId={setCurrencyId}
                            setCurrencyCode={setCurrencyCode} 
                            setAccountNumber={setAccountNumber}
                        />
                        <InputAccountNumber 
                            accountNumber={accountNumber}
                            setAccountNumber={setAccountNumber}
                            currencyCode={currencyCode}
                        />
                        <input 
                            name="contractSum"
                            type="number"
                            min={0}
                            placeholder='Сумма контракта'
                            autoComplete='off'
                        />
                        <input 
                            name="depositSum"
                            type="number"
                            min={0}
                            placeholder='Сумма депозита'
                            autoComplete='off'
                        />
                    </fieldset>
                    <fieldset className='row'>
                        <button 
                            disabled={params ? false : true} 
                            type='submit'>Сохранить</button>
                        {saving && <Spinner size={2} />}
                        {!saving && <AccountCloseBtn setOpenAccount={setOpenAccount} />}
                    </fieldset>
                </>
            }            
        </form>
    )
}

export default UserAccounts;