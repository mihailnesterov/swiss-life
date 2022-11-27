import React, {useState, useEffect} from 'react';
import {updateAccount} from '../../../api/account';
import {getToastSuccess, getToastError} from '../../../utils/toasts';
import Spinner from '../../common/loader/Spinner';

const EditAccount = (props) => {
    
    const {account, setAccountEditedId} = props;
 
    const [params, setParams] = useState(null);
    const [saving, setSaving] = useState(false);
    const [isSubmitDisabled, setSubmitDisabled] = useState(false);

    useEffect(() => {
        if( params ) {
            setSubmitDisabled(true);
        } else {
            setSubmitDisabled(false);
        }
    }, [params]);

    const handleSaveAccount = () => {
        if(params) {
            setSaving(true);
            updateAccount(account.id, params)
                .then(res => getToastSuccess('Счет обновлен!',res))
                .catch(err => getToastError('Ошибка при обновлении счета!',err))
                .finally(() => {
                    setParams(null);
                    setSaving(false);
                    setAccountEditedId(null);
                });
        }
    }

    const handleChangeParams= e => {
        const name = e.target.name;
        const value = parseInt(e.target.value);
        setParams({
            ...params, 
            ...{[name]:value}
        });
    }

    const handleCancel = () => setAccountEditedId(null);
    
    return(
        <div onChange={handleChangeParams} style={{maxWidth:'350px'}}>
            <h4>Редактировать счет</h4>
            <fieldset className='column'>
                <h5>{account.number} {account.currency.sign} ({account.currency.shortName})</h5>
                <label for="contractSum">Сумма контракта
                <input 
                    id="contractSum"
                    name="contractSum"
                    type="number"
                    min={0}
                    placeholder='Сумма контракта'
                    autoComplete='off'
                    defaultValue={account.contractSum}
                /></label>
                <label for="depositSum">Сумма депозита
                <input 
                    id="depositSum"
                    name="depositSum"
                    type="number"
                    min={0}
                    placeholder='Сумма депозита'
                    autoComplete='off'
                    defaultValue={account.depositSum}
                /></label>
            </fieldset>
            <fieldset className='row'>
                <button 
                    disabled={!isSubmitDisabled}
                    onClick={handleSaveAccount}
                    type='button'
                    style={{backgroundColor:'#f05050'}}>Сохранить</button>
                {saving && <Spinner size={2} />}
                {!saving && <button type='button' onClick={handleCancel}>Отмена</button>}
            </fieldset>
        </div>
    );
}

export default EditAccount;