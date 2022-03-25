import React from 'react';
import { useSelector } from "react-redux";
import Partners from './Partners';
import UserInfo from './UserInfo';
import UserStat from './UserStat';
import Spinner from '../common/loader/Spinner';

const HomePage = () => {
    
    const {user, loading} = useSelector( state => state.user);

    return (
        <div className='homepage'>
            <div>
                {
                    loading ? 
                    'Загрузка профиля ...' : 
                    user && 
                    <UserInfo user={user} />
                }
            </div>
            <div>
                {
                    user && 
                    user.accounts && 
                    user.userAssetsTotal &&
                    <UserStat 
                        stat={user.accounts} 
                        assetsStat={user.userAssetsTotal} 
                    />
                }
                
                <Partners />
            </div>
        </div>
    )
}

export default HomePage;