import React, {useEffect} from 'react';
import { useSelector } from "react-redux";
import {useActions} from '../../hooks/useActions';
import { useLingui } from "@lingui/react";
import LangSwitcherButton from './LangSwitcherButton';

const UserLangSwitcher = (props) => {
   
    const {user} = props;
    const {i18n} = useLingui();
    const {languages} = useSelector( state => state.languages);
    const {fetchLanguages} = useActions();

    useEffect(() => {
        fetchLanguages();
    }, []);

    const handleSwitchLanguage = e => i18n.activate(e.target.textContent);

    return (
        <div className='languages-menu'>
            {
                i18n.locale &&
                languages && 
                languages.length > 0 &&
                languages.map(
                    lang => <LangSwitcherButton 
                        key={lang.id} 
                        user={user} 
                        lang={lang}
                        locale={i18n.locale}
                        handleSwitchLanguage={handleSwitchLanguage}
                    />
                )
            }
        </div>
    )
}

export default UserLangSwitcher;