import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import EditAccount from './EditAccount';

const AccountsList = (props) => {
    
    const {accounts} = props;

    const [accountEditedId, setAccountEditedId] = useState(null);

    const handleEditAccount = id => setAccountEditedId(id);
    
    return(
        <ul>
            {
                accounts.map((acc,i) => 
                    <li key={acc.id}>
                        {
                            accountEditedId && 
                            accountEditedId === acc.id  ?
                            <EditAccount account={acc} setAccountEditedId={setAccountEditedId} /> :
                            <>
                                <span>{i+1}. {acc.number}</span>
                                <span>{acc.currency.sign} ({acc.currency.shortName})</span>
                                <button className='btn-edit' onClick={() => handleEditAccount(acc.id)}>
                                    <FontAwesomeIcon 
                                        size='2x' 
                                        title='Редактировать' 
                                        icon={solid('square-pen')} 
                                        style={{color:'#44987A'}} 
                                    />
                                </button>
                            </>
                        }
                    </li>
                )
            }
        </ul>
    );
}

export default AccountsList;