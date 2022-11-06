import React, {useEffect} from 'react';
import { useSelector } from "react-redux";
import {useActions} from '../../hooks/useActions';
import { useLingui } from "@lingui/react";
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
        setLanguage(user.id, {lang_id:Number(e.target.value)})
            .then(res => {
                i18n.activate(e.target.options[e.target.selectedIndex].text);
                window.localStorage.setItem('_swiss_life_lang', e.target.options[e.target.selectedIndex].text);
                
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
                <select 
                    id="languages-switcher"
                    onChange={handleSwitchLanguage}>
                    {
                        languages.map(lang => 
                            <option 
                                key={lang.id} 
                                value={lang.id}
                                selected={i18n.locale === lang.locale ? true: null}
                            >
                                {lang.locale}
                            </option>
                        )
                    }
                </select>
            }
        </div>
    )
}

export default LangSwitcher;