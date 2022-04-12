import React, {useState, useEffect} from 'react';
import { useActions } from '../../hooks/useActions';
import {createAccount} from '../../api/account';
import Spinner from '../common/loader/Spinner';
import AccountsList from './accounts/AccountsList';
import AccountOpenBtn from './accounts/AccountOpenBtn';
import AccountCloseBtn from './accounts/AccountCloseBtn';
import AccountsSelectCurrency from './accounts/AccountsSelectCurrency';
import AccountNumber from './accounts/AccountNumber';

const UserAccounts = (props) => {

    const {user} = props;

    const {fetchUsersOfAuthorizedManagerExpanded} = useActions();

    const [isOpenAccount, setOpenAccount] = useState(false);    
    const [params, setParams] = useState(null);
    const [saving, setSaving] = useState(false);
    
    const [currency, setCurrency] = useState(null);
    const [accounts, setAccounts] = useState(null);

    useEffect(() => {
        if( user.accounts && user.accounts.length > 0 ) {
            setAccounts(user.accounts);
        }
    }, [user]);

    const [accountNumber, setAccountNumber] = useState(null);

    useEffect(() => {
        if( accountNumber && accountNumber !== '' ) {
            setParams({
                ...params, 
                'number': accountNumber
            });
        } else {
            if(params && params['number']) {
                const _params = params;
                delete _params['number'];
                setParams({..._params}); 
            }
        }
    }, [accountNumber]);

    const [isSubmitDisabled, setSubmitDisabled] = useState(false);

    useEffect(() => {
        if( params && params['currency_id'] && params['number'] ) {
            setSubmitDisabled(true);
        } else {
            setSubmitDisabled(false);
        }
    }, [params]);

    const handleSubmitForm = e => {
        e.preventDefault();
        setSaving(true);
        if(params) {
            setSaving(false);
            createAccount(params)
                .then(res => {
                    getToastSuccess('Счет создан!',res);
                    fetchUsersOfAuthorizedManagerExpanded();
                    setAccountNumber(null);
                    setCurrency(null);
                })
                .catch(err => getToastError('Ошибка при создании счета!',err))
                .finally(() => {
                    setParams(null);
                    setSaving(false);
                });
        }
    }

    const handleChangeForm = e => {
        const name = e.target.name;
        const value = e.target.name === 'currency_id' ? Number(e.target.value) : e.target.value;
        const excludeFields = ['currencies'];
        
        if(excludeFields.filter(item => item === name).length > 0) {
            setParams({
                ...params,
                'user_id': user.id
            });
        } else {
            setParams({
                ...params, 
                ...{[name]:value},
                'user_id': user.id
            });
        }
    }

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
                    <h4>Открыть счет</h4>
                    <fieldset className='column'>
                        <AccountsSelectCurrency
                            setParams={setParams}
                            params={params}
                            accounts={accounts}
                            currency={currency}
                            setCurrency={setCurrency}
                        />
                        {/**/}
                        <AccountNumber 
                            accountNumber={accountNumber}
                            setAccountNumber={setAccountNumber}
                            currency={currency}
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
                            disabled={!isSubmitDisabled}
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