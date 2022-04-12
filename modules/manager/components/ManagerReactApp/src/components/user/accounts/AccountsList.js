import React from 'react';

const AccountsList = (props) => {
    
    const {accounts} = props;
    
    return(
        accounts &&
        accounts.length > 0 &&
        <ul>
            {
                accounts.map((acc,i) => 
                    <li key={acc.id}>
                        <span>{i+1}. {acc.number}</span>
                        <span>{acc.currency.sign} ({acc.currency.shortName})</span>
                    </li>
                )
            }
        </ul>
    );
}

export default AccountsList;