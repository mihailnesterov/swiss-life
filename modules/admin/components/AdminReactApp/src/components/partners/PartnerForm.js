import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {getToastSuccess, getToastError} from '../../utils/toasts';
import {updatePartner, createPartner} from '../../api/partner';
import Spinner from '../common/loader/Spinner';
import { BASE_URL } from '../../api';

const PartnerForm = (props) => {

    const {partner} = props;

    const {company} = useSelector( state => state.company);

    const navigate = useNavigate();

    const [params, setParams] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if(company && company.id) {
            setParams({
                'company_id': company.id,
                ...params
            });
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
            if(partner.id) {
                updatePartner(partner.id, params)
                    .then(res => getToastSuccess('Партен сохранен!',res))
                    .catch(err => getToastError('Ошибка при сохранении партнера!',err))
                    .finally(() => {
                        setParams(null);
                        setSaving(false);
                    });
            } else {
                createPartner(params)
                    .then(res => {
                        getToastSuccess('Партнер добавлен!',res);
                        navigate(`${BASE_URL}/partners/${res.data.id}`, { replace: true });
                    })
                    .catch(err => getToastError('Ошибка при добавлении партнера!',err))
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
                    <label htmlFor="name">
                        <p><small>Название</small></p>
                        <input 
                            name="name"
                            type="text"
                            placeholder='Название'
                            defaultValue={partner.name}
                            autoComplete='off'
                            required={true}
                        />
                    </label>
                    <label htmlFor="url">
                        <p><small>Ссылка</small></p>
                        <input 
                            name="url"
                            type="text"
                            placeholder='Ссылка'
                            defaultValue={partner.url}
                            autoComplete='off'
                        />
                    </label>
                </fieldset>
                <fieldset className='column'>
                    <label htmlFor="description">
                        <p><small>Описание</small></p>
                        <textarea 
                            name="description"
                            cols={40} 
                            rows={5} 
                            placeholder='Описание'
                        >{partner.description}
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

export default PartnerForm;