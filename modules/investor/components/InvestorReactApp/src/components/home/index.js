import React from 'react';
import { useSelector } from "react-redux";
import UserStat from '../user/UserStat';
import Spinner from '../common/loader/Spinner';

const HomePage = () => {
    
    const {user, loading} = useSelector( state => state.user);

    return (
        <div className='homepage'>
            {loading ? <Spinner size={2} /> :
                user && 
                user.accounts && 
                user.userAssetsTotal &&
                user.userLeverageTotal &&
                <UserStat 
                    stat={user.accounts} 
                    assetsStat={user.userAssetsTotal} 
                    leverageStat={user.userLeverageTotal} 
                />
            }
        </div>
    )
}

export default HomePage;