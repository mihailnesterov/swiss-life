import React from 'react';

const AccountOpenBtn = (props) => {

    const {accounts, setOpenAccount} = props;

    const handleOpenAccount = () => setOpenAccount(true);

    return(
        <button 
            type='button' 
            onClick={handleOpenAccount}
            disabled={accounts && accounts.length >= 2 ? true : false}
            >+ Открыть счет
        </button>
    );
}

export default AccountOpenBtn;