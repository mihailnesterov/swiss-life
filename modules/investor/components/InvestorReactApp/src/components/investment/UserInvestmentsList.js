import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import UserInvestmentItem from './UserInvestmentItem';
import { Trans } from '@lingui/macro';

const UserInvestmentsList = () => {

    const {user} = useSelector( state => state.user);

    const [userAssets, setUserAssets] = useState(null);

    useEffect(() => {
        if(user.userAssets && user.userAssets.length > 0) {
            setUserAssets(user.userAssets);
        }

        return () => setUserAssets(null);
    },[user]);

    return (
        userAssets &&
        <div className='user-investments'>
            <h2><Trans>Мои инвестиции</Trans></h2>
            <div>
                {
                    userAssets.map(item => <UserInvestmentItem key={item.id} item={item} />)
                }
            </div>
        </div>
    )
}

export default UserInvestmentsList;