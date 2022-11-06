import React from 'react';
import UserVisitItem from './UserVisitItem';
import { Trans } from '@lingui/macro';

const UserVisits = (props) => {
    
    const {user} = props;

    return (
        <div className='user-visits'>
            <h3><Trans>Последние визиты</Trans></h3>
            <table>
                <thead>
                    <tr>
                        <th>IP</th>
                        <th><Trans>Дата и время</Trans></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.userVisits && 
                        user.userVisits.length > 0 && 
                        user.userVisits.map(item => <UserVisitItem item={item}/>)
                    }
                </tbody>
            </table>
        </div>        
    )
}

export default UserVisits;