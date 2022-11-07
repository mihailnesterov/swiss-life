import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import {getToastSuccess, getToastError} from '../../utils/toasts';
import {updateContract, createContract} from '../../api/contract';
import Spinner from '../common/loader/Spinner';
import { BASE_URL } from '../../api';

const ContractForm = (props) => {

    const {contract} = props;

    const navigate = useNavigate();

    const [params, setParams] = useState(null);
    const [saving, setSaving] = useState(false);

    const handleChangeForm = e => {
        const name = e.target.name;
        const value = e.target.value;
        setParams({
            ...params, 
            ...{[name]:value}
        });       
    }

    const handleSubmitForm = e => {
        e.preventDefault();
        setSaving(true);
        
        if(params) {
            if(contract.id) {
                updateContract(contract.id, params)
                    .then(res => getToastSuccess('Договор сохранен!',res))
                    .catch(err => getToastError('Ошибка при сохранении договора!',err))
                    .finally(() => {
                        setParams(null);
                        setSaving(false);
                    });
            } else {
                createContract(params)
                    .then(res => {
                        getToastSuccess('Договор добавлен!',res);
                        navigate(`${BASE_URL}/contracts/${res.data.id}`, { replace: true });
                    })
                    .catch(err => getToastError('Ошибка при добавлении договора!',err))
                    .finally(() => {
                        setParams(null);
                        setSaving(false);
                    });
            }
        }
    }
    
    return (
        <form onSubmit={handleSubmitForm} onChange={handleChangeForm}>
            <fieldset className='column'>
                <label htmlFor="description">
                    <p><small>Название</small></p>
                    <input 
                        name="description"
                        type="text"
                        placeholder='Название'
                        defaultValue={contract.description}
                        autoComplete='off'
                    />
                </label>
            </fieldset>
            <hr />
            <fieldset>
                <button disabled={params ? false : true} type='submit'>Сохранить</button>
                {saving && <Spinner size={2} />}
            </fieldset>
        </form>
    )
}

export default ContractForm;