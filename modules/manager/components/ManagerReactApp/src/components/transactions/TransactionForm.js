import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {getToastSuccess, getToastError} from '../../utils/toasts';
import {updateTransaction, createTransaction} from '../../api/transaction';
import Spinner from '../common/loader/Spinner';
import {getDateTimeLocal} from '../../utils/dates';
import AutocompleteAsset from '../common/autocomplete/AutocompleteAsset';
import AutocompleteCurrency from '../common/autocomplete/AutocompleteCurrency';
import AutocompleteTransactionType from '../common/autocomplete/AutocompleteTransactionType';
import AutocompleteUser from '../common/autocomplete/AutocompleteUser';
import AutocompleteAccount from '../common/autocomplete/AutocompleteAccount';
import { BASE_URL } from '../../api';

const TransactionForm = (props) => {

    const {transaction} = props;

    const {user} = useSelector( state => state.user);

    const navigate = useNavigate();

    const [params, setParams] = useState(null);
    const [saving, setSaving] = useState(false);

    const [currency, setCurrency] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if(user && user.id) {
            setParams({
                'manager_id': user.id,
                ...params
            });
        }
    }, [user]);


    const handleChangeForm = e => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? (e.target.checked === true ? 1 : 0) : e.target.value;
        const excludeFields = [
            'user', 
            'user-accounts',
            'transaction-types',
            'currencies'
        ];
        
        if(excludeFields.filter(item => item === name).length > 0) {
            setParams({...params});
        } else {
            setParams({
                ...params, 
                ...{[name]:value}
            });
        }        
    }

    const handleSubmitForm = e => {
        e.preventDefault();
        setSaving(true);
        
        if(params) {
            if(transaction.id) {
                updateTransaction(transaction.id, params)
                    .then(res => getToastSuccess('Операция сохранена!',res))
                    .catch(err => getToastError('Ошибка при сохранении финансовой операции!',err))
                    .finally(() => {
                        setParams(null);
                        setSaving(false);
                    });
            } else {
                createTransaction(params)
                    .then(res => {
                        getToastSuccess('Операция добавлена!',res);
                        navigate(`${BASE_URL}/transactions/${res.data.id}`, { replace: true });
                    })
                    .catch(err => getToastError('Ошибка при добавлении финансовой операции!',err))
                    .finally(() => {
                        setParams(null);
                        setSaving(false);
                    });
            }
        }
    }
    
    return (
        <form onSubmit={handleSubmitForm} onChange={handleChangeForm}>
            <div className='row'>
                <fieldset className='column'>
                    <AutocompleteUser
                        transaction={transaction}
                        setUserId={setUserId}
                    />
                    <AutocompleteAccount 
                        transaction={transaction}
                        setParams={setParams}
                        params={params}
                        userId={userId}
                        setCurrency={setCurrency}
                    />
                </fieldset>

                <fieldset className='column'>
                    <label htmlFor="sum">
                        <p><small>Сумма</small></p>
                        <input 
                            name="sum"
                            type="number"
                            placeholder='Сумма'
                            defaultValue={transaction.sum}
                            autoComplete='off'
                            required={true}
                        />
                    </label>
                    <AutocompleteCurrency 
                        setParams={setParams}
                        params={params}
                        currency={currency}
                    />
                </fieldset>

                <fieldset className='column'>
                    <AutocompleteTransactionType 
                        transaction={transaction}
                        setParams={setParams}
                        params={params}
                    />
                    <AutocompleteAsset 
                        transaction={transaction}
                        setParams={setParams}
                        params={params}
                    />
                </fieldset>

                <fieldset className='column'>
                    <label htmlFor="accepted">
                        <p><small>Дата принятия</small></p>
                        <input 
                            name="accepted"
                            type="datetime-local"
                            placeholder='Дата принятия'
                            defaultValue={transaction.accepted ? getDateTimeLocal(transaction.accepted) : null}
                            autoComplete='off'
                        />
                    </label>
                    <label htmlFor="rejected">
                        <p><small>Дата отмены</small></p>
                        <input 
                            name="rejected"
                            type="datetime-local"
                            placeholder='Дата отмены'
                            defaultValue={transaction.rejected ? getDateTimeLocal(transaction.rejected) : null}
                            autoComplete='off'
                        />
                    </label>
                    <div className='checkbox'>
                        <input  
                            name="status"
                            type="checkbox"
                            defaultChecked={transaction.status} 
                        />
                        <label htmlFor="status">Статус</label>
                    </div>
                </fieldset>

                <fieldset className='column'>
                    <label htmlFor="description">
                        <p><small>Описание</small></p>
                        <textarea 
                            name="description"
                            cols={21} 
                            rows={5} 
                            placeholder='Описание'>
                            {transaction.description}
                        </textarea>
                    </label>
                </fieldset>
            </div>
            <hr />
            <fieldset>
                <button disabled={params ? false : true} type='submit'>Сохранить</button>
                {saving && <Spinner size={2} />}
            </fieldset>
        </form>
    )
}

export default TransactionForm;