import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import UserInvestmentItem from './UserInvestmentItem';

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
            <h2>Мои инвестиции</h2>
            <div>
                {
                    userAssets.map(item => <UserInvestmentItem item={item} />)
                }
            </div>
        </div>
    )
}

export default UserInvestmentsList;