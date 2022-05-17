import React from 'react';

const LangSwitcherButton = (props) => {
   
    const {lang, locale, handleSwitchLanguage} = props;

    return (
        <button 
            onClick={handleSwitchLanguage}
            title={lang.name}
            className={locale === lang.locale ? 'active': null}
            data-lang-id={lang.id}
        >{lang.locale}</button>
    )
}

export default LangSwitcherButton;