import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import {getToastSuccess, getToastError} from '../../utils/toasts';
import {updateCompany} from '../../api/company';
import Spinner from '../common/loader/Spinner';

const CompanyForm = () => {

    const {company} = useSelector( state => state.company);

    const [activeCompany, setActiveCompany] = useState(null);
    const [params, setParams] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if(company && company.length > 0) {
            setActiveCompany(company[0]);
        }
    }, [company]);


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
            updateCompany(company[0].id, params)
                .then(res => getToastSuccess('Компания сохранена!',res))
                .catch(err => getToastError('Ошибка при сохранении компании!',err))
                .finally(() => {
                    setParams(null);
                    setSaving(false);
                });
        }
    }
    
    return (
        activeCompany ?
        <form onSubmit={handleSubmitForm} onChange={handleChangeForm}>
            <div className='row'>
                <fieldset className='column'>
                    <label htmlFor="name">
                        <p><small>Название</small></p>
                        <input 
                            name="name"
                            type="text"
                            placeholder='Название'
                            defaultValue={activeCompany.name}
                            autoComplete='off'
                        />
                    </label>
                    <label htmlFor="email">
                        <p><small>Email</small></p>
                        <input 
                            name="email"
                            type="text"
                            placeholder='Email'
                            defaultValue={activeCompany.email}
                            autoComplete='off'
                        />
                    </label>
                    <label htmlFor="phone">
                        <p><small>Телефон</small></p>
                        <input 
                            name="phone"
                            type="text"
                            placeholder='Телефон'
                            defaultValue={activeCompany.phone}
                            autoComplete='off'
                        />
                    </label>
                </fieldset>

            </div>
            <hr />
            <fieldset>
                <button disabled={params ? false : true} type='submit'>Сохранить</button>
                {saving && <Spinner size={2} />}
            </fieldset>
        </form> :
        <Spinner size={2} />
    )
}

export default CompanyForm;