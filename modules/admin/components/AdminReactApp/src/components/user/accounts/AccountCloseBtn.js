import React from 'react';

const AccountCloseBtn = (props) => {

    const {setOpenAccount} = props;

    const handleCloseAccount = () => setOpenAccount(false);

    return(
        <button 
            type='button' 
            onClick={handleCloseAccount}
            >Отмена
        </button>
    );
}

export default AccountCloseBtn;