import React, {useEffect} from 'react';
import { useSelector } from "react-redux";
import {useActions} from '../../hooks/useActions';
import { useLingui } from "@lingui/react";
import LangSwitcherButton from './LangSwitcherButton';
import {setLanguage} from '../../api/user';
import {getToastSuccess, getToastError} from '../../utils/toasts';
import { t } from "@lingui/macro";

const LangSwitcher = (props) => {
   
    const {user} = props;
    const {i18n} = useLingui();
    const {languages} = useSelector( state => state.languages);
    const {fetchLanguages} = useActions();

    useEffect(() => {
        fetchLanguages();
    }, []);

    const handleSwitchLanguage = e => {
        setLanguage(user.id, {lang_id:Number(e.target.dataset.langId)})
            .then(res => {
                i18n.activate(e.target.textContent);
                window.localStorage.setItem('_swiss_life_lang', e.target.textContent);
                
                getToastSuccess(t({
                    id: 'Язык переключен', 
                    message: 'Язык переключен'
                }),res);
            })
            .catch(err => getToastError(t({
                id: 'Ошибка при изменении языка', 
                message: 'Ошибка при изменении языка'
            }),err))
    };

    return (
        <div className='languages-menu'>
            {
                i18n.locale &&
                languages && 
                languages.length > 0 &&
                languages.map(
                    lang => <LangSwitcherButton 
                        key={lang.id}
                        lang={lang}
                        locale={i18n.locale}
                        handleSwitchLanguage={handleSwitchLanguage}
                    />
                )
            }
        </div>
    )
}

export default LangSwitcher;