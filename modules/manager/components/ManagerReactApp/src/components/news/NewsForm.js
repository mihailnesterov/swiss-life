import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {getToastSuccess, getToastError} from '../../utils/toasts';
import {updateNews, createNews} from '../../api/news';
import Spinner from '../common/loader/Spinner';
import { BASE_URL } from '../../api';

const NewsForm = (props) => {

    const {news} = props;

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
            if(news.id) {
                updateNews(news.id, params)
                    .then(res => getToastSuccess('Новость сохранена!',res))
                    .catch(err => getToastError('Ошибка при сохранении новости!',err))
                    .finally(() => {
                        setParams(null);
                        setSaving(false);
                    });
            } else {
                createNews(params)
                    .then(res => {
                        getToastSuccess('Новость добавлена!',res);
                        navigate(`${BASE_URL}/news/${res.data.id}`, { replace: true });
                    })
                    .catch(err => getToastError('Ошибка при добавлении новости!',err))
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
                    <label htmlFor="title">
                        <p><small>Заголовок</small></p>
                        <textarea 
                            name="title"
                            cols={40} 
                            rows={2} 
                            placeholder='Заголовок'
                            required={true}
                        >{news.title}
                        </textarea>
                    </label>
                    <label htmlFor="excerpt">
                        <p><small>Анонс</small></p>
                        <textarea 
                            name="excerpt"
                            cols={40} 
                            rows={5} 
                            placeholder='Анонс'
                            required={true}
                        >{news.excerpt}
                        </textarea>
                    </label>
                </fieldset>

                <fieldset className='column'>
                    <label htmlFor="text">
                        <p><small>Текст</small></p>
                        <textarea 
                            name="text"
                            cols={40} 
                            rows={10} 
                            placeholder='Текст'
                        >{news.text}
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

export default NewsForm;