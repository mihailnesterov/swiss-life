import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {getToastSuccess, getToastError} from '../../utils/toasts';
import {updateSeminar, createSeminar} from '../../api/seminar';
import Spinner from '../common/loader/Spinner';
import { BASE_URL } from '../../api';

const SeminarForm = (props) => {

    const {seminar} = props;

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
            if(seminar.id) {
                updateSeminar(seminar.id, params)
                    .then(res => getToastSuccess('Семинар сохранен!',res))
                    .catch(err => getToastError('Ошибка при сохранении семинара!',err))
                    .finally(() => {
                        setParams(null);
                        setSaving(false);
                    });
            } else {
                createSeminar(params)
                    .then(res => {
                        getToastSuccess('Семинар добавлен!',res);
                        navigate(`${BASE_URL}/seminars/${res.data.id}`, { replace: true });
                    })
                    .catch(err => getToastError('Ошибка при добавлении семинара!',err))
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
                            defaultValue={seminar.name}
                            autoComplete='off'
                            required={true}
                        />
                    </label>
                    <label htmlFor="description">
                        <p><small>Описание</small></p>
                        <textarea 
                            name="description"
                            cols={40} 
                            rows={5} 
                            placeholder='Описание'
                        >{seminar.description}
                        </textarea>
                    </label>
                </fieldset>
                <fieldset className='column'>
                    <label htmlFor="start_date">
                        <p><small>Дата</small></p>
                        <input 
                            name="start_date"
                            type="text"
                            placeholder='00.00.0000'
                            defaultValue={seminar.start_date}
                            autoComplete='off'
                            required={true}
                        />
                    </label>
                    <label htmlFor="start_time">
                        <p><small>Время</small></p>
                        <input 
                            name="start_time"
                            type="text"
                            placeholder='00:00'
                            defaultValue={seminar.start_time}
                            autoComplete='off'
                            required={true}
                        />
                    </label>
                    <label htmlFor="form_link">
                        <p><small>Ссылка на форму</small></p>
                        <input 
                            name="form_link"
                            type="text"
                            placeholder='https://'
                            defaultValue={seminar.form_link}
                            autoComplete='off'
                            required={true}
                        />
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

export default SeminarForm;