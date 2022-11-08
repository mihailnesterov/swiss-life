import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {getToastSuccess, getToastError} from '../../utils/toasts';
import {updateAsset, createAsset} from '../../api/asset';
import Spinner from '../common/loader/Spinner';
import { BASE_URL } from '../../api';

const InvestmentForm = (props) => {

    const {asset} = props;

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
        const value = e.target.type === 'checkbox' ? (e.target.checked === true ? 1 : 0) : e.target.value;
        setParams({
            ...params, 
            ...{[name]:value}
        });       
    }

    const handleSubmitForm = e => {
        e.preventDefault();
        setSaving(true);
        
        if(params) {
            if(asset.id) {
                updateAsset(asset.id, params)
                    .then(res => getToastSuccess('Актив сохранен!',res))
                    .catch(err => getToastError('Ошибка при сохранении актива!',err))
                    .finally(() => {
                        setParams(null);
                        setSaving(false);
                    });
            } else {
                createAsset(params)
                    .then(res => {
                        getToastSuccess('Актив добавлен!',res);
                        navigate(`${BASE_URL}/investment/${res.data.id}`, { replace: true });
                    })
                    .catch(err => getToastError('Ошибка при добавлении актива!',err))
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
                            defaultValue={asset.name}
                            autoComplete='off'
                            required={true}
                        />
                    </label>
                    <label htmlFor="calculation">
                        <p><small>Калькуляция</small></p>
                        <input 
                            name="calculation"
                            type="text"
                            placeholder='Калькуляция'
                            defaultValue={asset.calculation}
                            autoComplete='on'
                        />
                    </label>
                </fieldset>

                <fieldset className='column'>
                    <label htmlFor="excerpt">
                        <p><small>Краткое описание</small></p>
                        <textarea 
                            name="excerpt"
                            cols={40} 
                            rows={5} 
                            placeholder='Краткое описание'
                            required={true}
                        >{asset.excerpt}
                        </textarea>
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
                        >{asset.description}
                        </textarea>
                    </label>
                </fieldset>

                <fieldset className='column'>
                    <label htmlFor="category">
                        <p><small>Категория</small></p>
                        <input 
                            name="category"
                            type="text"
                            placeholder='Категория'
                            defaultValue={asset.category}
                            autoComplete='on'
                        />
                    </label>
                    <div className='checkbox'>
                        <input  
                            name="status"
                            type="checkbox"
                            defaultChecked={asset.status} 
                        />
                        <label htmlFor="status">Статус</label>
                    </div>
                </fieldset>

                <fieldset className='column'>
                    <label htmlFor="maximum">
                        <p><small>Исторический максимум</small></p>
                        <input 
                            name="maximum"
                            type="text"
                            placeholder='0.00'
                            defaultValue={asset.maximum}
                            autoComplete='off'
                        />
                    </label>
                </fieldset>

                <fieldset className='column'>
                    <label htmlFor="minimum">
                        <p><small>Исторический минимум</small></p>
                        <input 
                            name="minimum"
                            type="text"
                            placeholder='0.00'
                            defaultValue={asset.minimum}
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
        </form>
    )
}

export default InvestmentForm;